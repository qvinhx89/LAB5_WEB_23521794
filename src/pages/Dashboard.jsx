import LargeList from '../components/performance/LargeList'
import UserProfile from '../components/UserProfile'
import Tabs from '../components/tabs/Tabs'

export default function Dashboard() {
  return (
    <div className="page">
      <h2>Dashboard</h2>
      <UserProfile />
      <Tabs defaultIndex={0}>
        <Tabs.List>
          <Tabs.Tab index={0}>Profile</Tabs.Tab>
          <Tabs.Tab index={1}>Performance</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel index={0}>
          <p>Compound Tabs let content sit anywhere in the tree.</p>
        </Tabs.Panel>
        <Tabs.Panel index={1}>
          <p>Panels render when their tab is active.</p>
        </Tabs.Panel>
      </Tabs>
      <LargeList />
    </div>
  )
}
