import { useMemo } from "react";
import { useViewRevenueCardsQuery } from "../../hooks/revenue/cards.view.all";
import { mapRevenueStatsToCards } from "../../utils/mapRevenueCards";
import CardGrid from "./CardGrid";

export default function RevenueCards() {
  const { data, isLoading, isError } = useViewRevenueCardsQuery();

  const displayCards = useMemo(
    () => mapRevenueStatsToCards(data) ?? [],
    [data],
  );

  if (isLoading) {
    return <div className="cards-loading">Loading revenue stats...</div>;
  }

  if (isError) {
    return <div className="cards-error">Error loading revenue stats</div>;
  }

  return <CardGrid displayCards={displayCards} />;
}

