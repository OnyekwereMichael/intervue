const CallingIndicator = () => {
  return (
    <span className="flex space-x-1 justify-center">
      <span className="w-[6px] h-[6px] bg-white rounded-full animate-bounce delay-150"></span>
      <span className="w-[6px] h-[6px] bg-white rounded-full animate-bounce delay-300"></span>
      <span className="w-[6px] h-[6px] bg-white rounded-full animate-bounce delay-450"></span>
    </span>
  )
}

export default CallingIndicator