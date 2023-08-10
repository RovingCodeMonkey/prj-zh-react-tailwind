import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { postFetch, deleteFetch } from "../common/fetchHelper";
import type { Address } from "../types/address";
import type { Customer } from "../types/customer";

function Addresses() {
  //Address list
  const [addresses, setAddresses] = useState<Array<Address>>([]);
  const [customer, setCustomer] = useState<Customer>();
  //Refresh address list when new item is added
  const [tweakedId, setTweakedId] = useState<string>("");
  //Add item error
  const [addAddressError, setAddAddressError] = useState<string>("");
  //Form data for adding
  const [formData, setFormData] = useState({
    nickname: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [submitting, setSubmitting] = useState(false);

  //Customer ID from route
  const { customerId = "" } = useParams();
  //Format for address string
  const blankOrSpaced = (str: string) => {
    return str && str.length > 0 ? ` ${str}` : "";
  };

   //Fetch Current Customer
   useEffect(() => {
    fetch(`/api/customers/${customerId}`)
      .then((response) => response.json())
      .then((data: Customer) => setCustomer(data))
      .catch((e) => console.log(e));
  }, [customerId]);

  //Fetch Addresses for current customer
  useEffect(() => {
    fetch(`/api/customers/${customerId}/addresses/`)
      .then((response) => response.json())
      .then((data: Array<Address>) => setAddresses(data))
      .catch((e) => console.log(e));
  }, [customerId, tweakedId]);

  //Delete address by id
  const handleDelete = (id: string) => {
    setSubmitting(true);
    deleteFetch<Array<Address>>(`/api/customers/${customerId}/addresses/${id}`)
      .then((result: Array<Address>) => {
        setAddresses(result);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setSubmitting(false);
      });
  };

  //Form change event, update that prop in object by input name
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      setAddAddressError("");
    }

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //Form submit, Attempt to add new Address
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    postFetch<Address>(`/api/customers/${customerId}/addresses/`, {
      //Remove leading and trailing spaces
      nickname: formData.nickname.trim(),
      street1: formData.street1.trim(),
      street2: formData.street2.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      zipcode: formData.zipcode.trim(),
      customer_id: customerId,
    })
      .then((result: Address) => {
        setTweakedId(result.id);
        setFormData({
          nickname: "",
          street1: "",
          street2: "",
          city: "",
          state: "",
          zipcode: "",
        });
        setAddAddressError("");
      })
      .catch((e: { status: number }) => {
        if (e.status == 422) {
          setAddAddressError("Addresses must be unique");
        } else {
          setAddAddressError("An unexpected error has occurred");
        }
        console.log(e);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <>
      <h1 className="py-4 text-center md:text-left">{customer?.fname} {customer?.lname}</h1>
      {addresses.map((c) => (
        <div className="md:flex md:flex-row py-2" key={c.id}>
          <div className="md:basis-1/4 text-center md:text-left">
            {c.nickname}
          </div>
          <div className="md:basis-2/4 py-2 text-center md:text-left md:py-0">{`${
            c.street1
          }${blankOrSpaced(c.street2)} ${c.city} ${c.state} ${c.zipcode}`}</div>
          <div className="md:basis-1/4 md:text-right text-center">
            <button className="btn btn-blue" onClick={() => handleDelete(c.id)}>
              delete
            </button>
          </div>
        </div>
      ))}
      <h2 className="py-4 text-center md:text-left">Add new Address</h2>
      <form onSubmit={handleSubmit}>
        {addAddressError.length > 0 ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center md:text-left">
            {addAddressError}
          </div>
        ) : (
          ""
        )}
        <div className="md:flex md:flex-row md:py-2 py-0">
          <fieldset className="md:basis-1/2 mr-2 md:py-0 py-2">
            <input
              className="w-full text-center md:text-left"
              placeholder="Nickname"
              name="nickname"
              value={formData.nickname}
              required
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="md:flex md:flex-row md:py-2 py-0">
          <fieldset className="md:basis-1/2 mr-2 md:py-0 py-2">
            <input
              className="w-full text-center md:text-left"
              placeholder="Street"
              required
              name="street1"
              value={formData.street1}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="md:basis-1/2 md:py-0 py-2">
            <input
              className="w-full text-center md:text-left"
              name="street2"
              placeholder="street2"
              value={formData.street2}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="md:flex md:flex-row md:py-2 py-0">
          <fieldset className="md:basis-1/3 mr-2 md:py-0 py-2">
            <input
              className="w-full text-center md:text-left"
              placeholder="city"
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="md:basis-1/3 mr-2 md:py-0 py-2">
            <input
              className="w-full text-center md:text-left"
              name="state"
              placeholder="state"
              value={formData.state}
              required
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="md:basis-1/3 md:py-0 py-2">
            <input
              className="w-full text-center md:text-left"
              name="zipcode"
              placeholder="zipcode"
              value={formData.zipcode}
              required
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="py-4 md:text-right text-center">
          <button className="btn btn-blue" disabled={submitting} type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Addresses;
