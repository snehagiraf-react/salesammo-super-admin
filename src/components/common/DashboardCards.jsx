import { useMemo } from "react";
import { useViewCardsQuery } from "../../hooks/dashboard/cards.view.all";
import { mapStatsToCards } from "../../utils/mapDashboardCards";
import CardGrid from "./CardGrid";

export default function DashboardCards() {
  const { data, isLoading, isError } = useViewCardsQuery();

  const displayCards = useMemo(() => mapStatsToCards(data) ?? [], [data]);

  if (isLoading) {
    return <div className="cards-loading">Loading dashboard stats...</div>;
  }

  if (isError) {
    return <div className="cards-error">Error loading dashboard stats</div>;
  }

  if (!displayCards.length) {
    return <div className="cards-error">No dashboard stats available</div>;
  }

  return <CardGrid displayCards={displayCards} />;
}

