'use client';

import { ChangeEventHandler, useEffect, useState, FC } from 'react';
import Advocate from './types/advocate';

const Home: FC = () => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch('/api/advocates').then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const handleResetAdvocates = () => {
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="m-w-dvw">
      <div className="p-6 bg-blue-500">
        <h1 className="text-2xl">Solace Advocates</h1>
      </div>
      <div className="m-6">
        <h2 className="text-xl">Search</h2>
        <p>
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input
          style={{ border: '1px solid black' }}
          onChange={handleInputChange}
          value={searchTerm}
        />
        <button className="bg-blue-500 p-1 m-1" onClick={handleResetAdvocates}>
          Reset Search
        </button>
      </div>
      <table className="m-6 overflow-x-auto">
        <thead className="border-2">
          <tr>
            <th className="p-2">First Name</th>
            <th className="p-2">Last Name</th>
            <th className="p-2">City</th>
            <th className="p-2">Degree</th>
            <th className="p-2">Specialties</th>
            <th className="p-2">Years of Experience</th>
            <th className="p-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, i) => {
            return (
              <tr
                className="border-2 odd:bg-gray-50 even:bg-gray-100"
                key={`advocate-${i}`}>
                <td className="p-2">{advocate.firstName}</td>
                <td className="p-2">{advocate.lastName}</td>
                <td className="p-2">{advocate.city}</td>
                <td className="p-2">{advocate.degree}</td>
                <td className="flex flex-wrap max-w-md p-1">
                  {advocate.specialties.map((specialty, j) => (
                    <span
                      className="truncate bg-blue-400 rounded-xl px-2 mt-1 mx-1"
                      key={`specialty-${j}`}>
                      {specialty}
                    </span>
                  ))}
                </td>
                <td className="p-2">{advocate.yearsOfExperience}</td>
                <td className="p-2">{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default Home;
