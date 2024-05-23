import React, { useState } from 'react'
import { GoChevronDown, GoChevronLeft } from 'react-icons/go'

const ExpandablePanel = ({header, children}) => {
  const [ expanded, setExpanded ] = useState(false)

  return (
    <div className="mb-2 border rounded">
      <div className="flex gap-x-2 p-2 justify-between items-center ">
        {header}
        <div onClick={() => setExpanded(!expanded)} className='cursor-pointer'>
          {expanded ? <GoChevronDown/> : <GoChevronLeft/>}
        </div>
      </div>
      { expanded && <div className="p-2 border-t">{children}</div> }
    </div>
  )
}

export default ExpandablePanel
