import { Phone, Stethoscope } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className="sticky top-0 z-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Care Connect</h1>
                <p className="text-xs text-gray-500">Smart OP Booking</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">+91 98765 43210</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
