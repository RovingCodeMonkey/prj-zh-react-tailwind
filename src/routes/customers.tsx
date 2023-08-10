import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import type { Customer } from "../types/customer";

function Customers() {
  const [customers, setCustomers] = useState<Array<Customer>>([]);
  useEffect(() => {
    fetch("/api/customers/")
      .then((response) => response.json())
      .then((data: Array<Customer>) => setCustomers(data))
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <h1 className="py-4 text-center md:text-left">Customers</h1>
      {customers.map((c) => (
        <div className="md:flex md:flex-row py-2" key={c.id}>
          <div className="md:basis-1/4 text-center md:text-left py-1 md:py-0">
            {`${c.fname} ${c.lname}`}
          </div>
          <div className="md:basis-1/2 text-center md:text-left py-1 md:py-0">
            {c.email}
          </div>
          <div className="md:basis-1/4 text-center md:text-right pt-4 md:pt-0">
            <Link className="btn btn-blue" to={`customers/${c.id}/addresses`}>
              address
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
export default Customers;
