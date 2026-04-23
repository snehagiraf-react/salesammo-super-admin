import React from 'react'
import FeatureControls from '../../components/featureControls'; 
import AccessControl from '../../components/accessControl';
import SubscriptionSettings from '../../components/subscriptionSettings';

const Settings = () => {
  return (
    <>
    <FeatureControls />
    <AccessControl />
    <SubscriptionSettings />
    </>
  )
}

export default Settings