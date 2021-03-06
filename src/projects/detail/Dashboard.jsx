import React from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import ProjectInfoContainer from './containers/ProjectInfoContainer'
import FeedContainer from './containers/FeedContainer'
import MobileNavigationTabs from './components/MobileNavigationTabs'
import Sticky from 'react-stickynode'
import spinnerWhileLoading from '../../components/LoadingSpinner'
import { SCREEN_BREAKPOINT_MD } from '../../config/constants'

require('./Dashboard.scss')

const DashboardView = ({project, currentMemberRole, route, params, isSuperUser }) => {
  const leftArea = (
    <div className="dashboard-left-panel">
      <ProjectInfoContainer
        currentMemberRole={currentMemberRole}
        project={project}
        isSuperUser={isSuperUser}
      />
    </div>
  )

  return (
    <div>
      <div className="dashboard-container">
        <MobileNavigationTabs projectId={project.id} />
        <div className="left-area">
          <MediaQuery minWidth={SCREEN_BREAKPOINT_MD}>
            {(matches) => {
              if (matches) {
                return <Sticky top={80}>{leftArea}</Sticky>
              } else {
                return leftArea
              }
            }}
          </MediaQuery>
        </div>
        <div className="right-area">
          <FeedContainer currentMemberRole={currentMemberRole} project={project} route={route} params={params} />
        </div>
      </div>
    </div>
  )
}

const enhance = spinnerWhileLoading(props => !props.isLoading)
const EnhancedDashboardView = enhance(DashboardView)

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <EnhancedDashboardView {...this.props} />
  }
}

const mapStateToProps = ({ projectState }) => {
  return {
    isLoading      : projectState.isLoading
  }
}

export default connect(mapStateToProps)(Dashboard)
