import { NexwebSVG } from './white-label-svg'

import './index.scss'

export const AfterNavComponent: React.FC = () => {
  return (
    <div className="afternav--wrapper">
      <div className="afternav--container">
        <NexwebSVG />
        <p>Studio</p>
      </div>
    </div>
  )
}
