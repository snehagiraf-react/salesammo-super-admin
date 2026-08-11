import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BadgePlus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { getPageTitle } from "../../utils/getPageTitle";
import Button from "../../components/common/button";
import Datatable from "../../components/common/datatable";
import SearchItem from "../../components/common/searchItem";
import Pagination, { usePagination } from "../../components/common/pagination";
import { useViewSubscriptionPlansQuery } from "../../hooks/subscriptionPlans/subscriptionPlan";
import { useSubscriptionStore } from "../../hooks/subscriptionPlans/createSubscription";
import { useSubscriptionUpdate } from "../../hooks/subscriptionPlans/updateSubscription";
import SubscriptionModal from "../../components/modal/subscriptionModal";
import { resolveBillingCycle } from "../../utils/resolveBillingCycle";
import { getPlanLabel } from "../../utils/planLabel";

const emptyForm = {
  plan: "",
  ownerType: "company",
  ownerId: "",
  status: "active",
  paymentStatus: "pending",
  billingCycle: "monthly",
  startDate: "",
  endDate: "",
  trialEndDate: "",
  replaceExisting: false,
  PlanHistory: [],
};

const withBillingCycle = (item) => ({
  ...item,
  billingCycle: resolveBillingCycle(item) || item?.billingCycle || "",
});

const SubscriptionPlans = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subscriptionMutation = useSubscriptionStore();
  const subscriptionUpdateMutation = useSubscriptionUpdate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const {
    data: subscriptionPlansData = [],
    isLoading,
    isError,
    refetch,
  } = useViewSubscriptionPlansQuery();

  useEffect(() => {
    const list = Array.isArray(subscriptionPlansData)
      ? subscriptionPlansData.map(withBillingCycle)
      : [];
    setSubscriptionPlans(list);
  }, [subscriptionPlansData]);

  const rows = useMemo(
    () => (isSearching ? filteredPlans : subscriptionPlans),
    [isSearching, filteredPlans, subscriptionPlans],
  );

  const { currentPage, currentItems, totalPages, handlePageChange } =
    usePagination(rows, 15);

  const columns = [
    {
      key: "plan",
      label: "Plan",
      render: (plan) => getPlanLabel(plan) || "—",
    },
    {
      key: "ownerType",
      label: "Owner Type",
      render: (ownerType) =>
        typeof ownerType === "object" && ownerType !== null
          ? ownerType.name || JSON.stringify(ownerType)
          : ownerType,
    },
    {
      key: "ownerId",
      label: "Owner",
      render: (ownerId) =>
        typeof ownerId === "object" && ownerId !== null
          ? ownerId.name || ownerId.email || JSON.stringify(ownerId)
          : ownerId,
    },
    { key: "status", label: "Status" },
    { key: "paymentStatus", label: "Payment Status" },
    {
      key: "billingCycle",
      label: "Billing Cycle",
      render: (_value, row) => resolveBillingCycle(row) || "—",
    },
  ];

  const actions = [{ type: "" }, { type: "edit" }, { type: "delete" }];

  const handleAction = ({ type, id, rowData }) => {
    const subscriptionId = id || rowData?._id || rowData?.id;

    if (type === "view") {
      if (!subscriptionId) {
        toast.error("Subscription id not found");
        return;
      }
      navigate(`/subscription-plans/${subscriptionId}`);
      return;
    }

    if (type === "edit") {
      setModalMode("edit");
      setFormData({
        plan: rowData.plan?._id || rowData.plan || "",
        ownerType: rowData.ownerType || "company",
        ownerId: rowData.ownerId?._id || rowData.ownerId || "",
        status: rowData.status || "active",
        paymentStatus: rowData.paymentStatus || "pending",
        billingCycle: resolveBillingCycle(rowData) || "monthly",
        startDate: rowData.startDate || "",
        endDate: rowData.endDate || "",
        trialEndDate: rowData.trialEndDate || "",
        replaceExisting: false,
        PlanHistory: rowData.PlanHistory || [],
      });
      setIsModalOpen(true);
      return;
    }

    if (type === "delete") {
      if (!subscriptionId) {
        toast.error("Subscription id not found");
        return;
      }

      Swal.fire({
        title: "Cancel this subscription?",
        text: "Status will be set to cancelled.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, cancel it",
      }).then((result) => {
        if (!result.isConfirmed) return;

        subscriptionUpdateMutation.mutate(
          { id: subscriptionId, body: { status: "cancelled" } },
          {
            onSuccess: () => {
              toast.success("Subscription cancelled");
              refetch();
            },
            onError: (err) => {
              toast.error(
                err.response?.data?.message ||
                  "Failed to cancel subscription",
              );
            },
          },
        );
      });
    }
  };

  const handleAddPackage = () => {
    setModalMode("add");
    setFormData({ ...emptyForm });
    setIsModalOpen(true);
  };

  const handleSaveSubscription = (payload) => {
    subscriptionMutation.mutate(payload, {
      onSuccess: async (res) => {
        const created = withBillingCycle({
          ...(res?.data || {}),
          billingCycle:
            res?.data?.billingCycle || payload.billingCycle || "monthly",
          startDate: res?.data?.startDate || payload.startDate,
          endDate: res?.data?.endDate || payload.endDate,
        });
        toast.success(res?.message || "Subscription created successfully");
        setIsModalOpen(false);
        setFormData({ ...emptyForm });
        setIsSearching(false);

        if (created?._id || created?.id) {
          setSubscriptionPlans((prev) => {
            const createdId = created._id || created.id;
            const withoutDup = prev.filter(
              (item) => (item._id || item.id) !== createdId,
            );
            return [created, ...withoutDup];
          });
        }

        await refetch();
      },
      onError: (err) => {
        toast.error(
          err.response?.data?.message || "Failed to create subscription",
        );
      },
    });
  };

  const handleSearchResults = useCallback(({ filteredData, searchItem }) => {
    setFilteredPlans(
      Array.isArray(filteredData) ? filteredData.map(withBillingCycle) : [],
    );
    setIsSearching(Boolean(searchItem?.trim()?.length));
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading subscription plans</div>;

  return (
    <>
      <div className="companies-page">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
        </div>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button onClick={handleAddPackage}>
            <BadgePlus size={18} />
            Create Subscription
          </Button>
        </div>
      </div>

      <SearchItem
        data={subscriptionPlans}
        searchField={[
          "billingCycle",
          "status",
          "paymentStatus",
          "ownerType",
        ]}
        placeholder="Search subscriptions..."
        onResultsChange={handleSearchResults}
      />

      <Datatable
        data={currentItems}
        columns={columns}
        actions={actions}
        onAction={handleAction}
      />

      {rows.length > 0 && (
        <div className="activity-pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <span>
            Showing {currentItems.length} of {rows.length} subscriptions
          </span>
        </div>
      )}

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        mode={modalMode}
        isLoading={subscriptionMutation.isPending}
        onSave={handleSaveSubscription}
      />
    </>
  );
};

export default SubscriptionPlans;
