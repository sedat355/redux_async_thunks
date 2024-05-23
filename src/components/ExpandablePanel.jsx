import React from 'react'

const ExpandablePanel = ({header, children}) => {
  return (
    <div className="mb-2 border rounded">
      <div className="flex gap-x-2 p-2 justify-between items-center cursor-pointer">
        {header}
      </div>
      <div className="p-2 border-t">{children}</div>
    </div>
  )
}

export default ExpandablePanel