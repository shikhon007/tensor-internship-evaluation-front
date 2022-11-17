import React, { useEffect, useState } from 'react'
import { allData } from '@components/registration/registrationSlice'
import axios from 'axios'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

const alluser = () => {
  const registration = useSelector((state) => state.registration)
  const dispatch = useDispatch()

  const getData = async () => {
    const token = localStorage.getItem('token')
    console.log('token', token)
    const config = {
      header: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const { data } = await axios.get('http://localhost:3030/api/v1/register')
      //setAllUser(data.data)
      dispatch(allData(data.data))
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="overflow-x-auto relative mt-10">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Company Name
            </th>
            <th scope="col" className="py-3 px-6">
              Representative Name
            </th>
            <th scope="col" className="py-3 px-6">
              Representative NID
            </th>
            <th scope="col" className="py-3 px-6">
              Company Address
            </th>
            <th scope="col" className="py-3 px-6">
              Company Email
            </th>
            <th scope="col" className="py-3 px-6">
              Company Mobile
            </th>
            <th scope="col" className="py-3 px-6">
              Owner Name
            </th>
            <th scope="col" className="py-3 px-6">
              Owner Contact
            </th>
            <th scope="col" className="py-3 px-6">
              Postal Code
            </th>
          </tr>
        </thead>
        <tbody>
          {registration.allUser.map((user) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id}>
              <td className="py-4 px-6">{user.companyName}</td>
              <td className="py-4 px-6">{user.representativeName}</td>
              <td className="py-4 px-6">{user.representativeNid}</td>
              <td className="py-4 px-6">{user.address}</td>
              <td className="py-4 px-6">{user.email}</td>
              <td className="py-4 px-6">{user.mobile}</td>
              <td className="py-4 px-6">{user.name}</td>
              <td className="py-4 px-6">{user.contact}</td>
              <td className="py-4 px-6">{user.postalCode}</td>
              <td className="py-4 px-6">
                <Link href={`/update/${user.id}`}>
                  <button className="bg-blue-300 py-2 w-[70px] text-white hover:bg-blue-500 rounded-md">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default alluser
