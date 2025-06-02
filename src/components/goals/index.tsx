import React, { useEffect, useState } from 'react'

export default function GoalsList(goals: any) {
  const [goal, setGoal] = useState<any>()

  useEffect(() => {
    setGoal(goals.goals)
  }, [goals])

  return (
    <div className="bg-gray-50 rounded-xl  h-17rem font-comfortaa text-black py-5 px-5 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="">Metas</h2>
      </div>
      <ul
        className="space-y-3 overflow-hidden overflow-y-auto  h-11rem"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {goal &&
          goal?.map((meta: any, index: any) => (
            <li
              key={index}
              className="bg-white  rounded-lg flex items-center justify-between shadow-sm px-3"
            >
              <div className="flex items-center gap-3 p-2">
                <div className="flex gap-2 items-center">
                  <span
                    className="px-1 rounded-md"
                    style={{
                      backgroundColor: meta.category.color,
                      color: '#fff',
                      marginTop: '4px',
                    }}
                  >
                    {meta.category.name}
                  </span>
                  {meta.title}
                </div>
              </div>
              <span
                className={`text-white text-xs px-2 py-1 rounded-full ${meta.cor}`}
              >
                {meta.tag}
              </span>
            </li>
          ))}
      </ul>
    </div>
  )
}
