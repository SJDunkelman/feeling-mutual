import React from "react"

export default function Accordion({ title, children }){
  const [isOpen, setisOpen] = React.useState(false);

  function handleClick() {
    setisOpen(!isOpen);
  }

  return (
    <div className='flex flex-col px-2 md:px-4 py-4 mt-2 group w-full'>
      <button onClick={handleClick}>
        <div className='flex justify-between items-center'>
          <div className='text-tomato font-bold text-xl whitespace-nowrap'>{title}</div>
            <i className={`fa-solid fa-chevron-${isOpen ? "up" : "down"}`} />
        </div>
      </button>
      <div className={`${isOpen ? "block" : "hidden"} shadow-3xl rounded-2xl shadow-cyan-500/50 py-4 px-2 mb-6`}>
        {children}
      </div>
    </div>
  )
}