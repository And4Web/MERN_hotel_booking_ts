

function Footer() {
  return (
    <div className="bg-blue-800 py-10 ">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">A-Bookings.com</span>
        <span className="text-white tracking-tight">Copyright&#169;2023-2025</span>
        <span className="text-white font-bold flex gap-4 tracking-tight">
          <p className="cursor-pointer">Privacy policy</p>
          <p className="cursor-pointer">Terms of services</p>
        </span>
      </div>
    </div>
  )
}

export default Footer