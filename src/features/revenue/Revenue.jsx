import React from 'react'
import Cards from '../../components/common/cards'
import { title } from 'framer-motion/client'

const Revenue = () => {

    const revenueCardsData = [
        {
            title: "Total Revenue",
            value: "$571.0k",
            trend: "+24.3%",
        },
        {
            title: "Total Customers",
            value: "241",
        },
        {
            title: "Avg Revenue per Company",
            value: "$62.6k",
        },
    ]    
  return (
    <>
    <Cards cardsData={revenueCardsData} />
    </>
  )
}

export default Revenue