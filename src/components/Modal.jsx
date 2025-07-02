import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
      <div className="modal-container">
        <div className="bg-gray-900 text-center p-5 h-90 lg:w-[500px] rounded shadow-md border-white border-2 outline-0">
          {/* modal content */}
          <h2 className="text-xl font-semibold mb-4 mt-6 uppercase">Please Login Here!</h2>
          <form className="px-4">
            {/* email */}
            <div className="mb-5">
              <input type="email" name="email" id="email" placeholder="enter @gmail.com"
                className="w-full rounded-md border border-[#e6e6e6] bg-white py-3 px-6 text-base 
                font-medium text-[#687280] outline-none focus:border-[#64a4f1] focus:shadow-md" />
            </div>
            <div className='mb-5'>
              <input type="password" name="password" id="password" placeholder="Enter your password"
                className="w-full rounded-md border border-[#e6e6e6] bg-white py-3 px-6 text-base 
                font-medium text-[#687280] outline-none focus:border-[#64a4f1] focus:shadow-md" />
            </div>
            <div>
              <button className="hover:shadow-md rounded-md bg-[#64a4f1] hover:bg-orange-600 py-2 px-8 text-base font-semibold text-white outline-none">Login</button>
            </div>
          </form>

          <button onClick={onClose} className='bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-8 rounded inline-flex items-center mt-5'>Close </button>

        </div>
      </div>
    </div>
  );
}

export default Modal;