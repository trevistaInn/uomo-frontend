import { useState } from "react";
import styles from "./DashboardAddresses.module.css";

export default function DashboardAddresses() {

  const [addresses, setAddresses] = useState([
    {
      type: "Billing Address",
      name: "Daniel Robinson",
      street: "1418 River Drive, Suite 35 Cottonhall, CA 9622",
      country: "United States",
      email: "sale@uomo.com",
      phone: "+1 246-345-0695"
    },
    {
      type: "Shipping Address",
      name: "Daniel Robinson",
      street: "1418 River Drive, Suite 35 Cottonhall, CA 9622",
      country: "United States",
      email: "sale@uomo.com",
      phone: "+1 246-345-0695"
    }
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editedAddress, setEditedAddress] = useState({});

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedAddress(addresses[index]);
  }

  const handleChange = (e) => {
    setEditedAddress({
      ...editedAddress,
      [e.target.name]: e.target.value
    });
  }
  
  const handleSave = () => {
    const updatedAddresses = [...addresses];
    updatedAddresses[editIndex] = editedAddress;
    setAddresses(updatedAddresses);
    setEditIndex(null);
  }

  return (
    <section>

      <p className={styles.note}>
        The following addresses will be used on the checkout page by default.
      </p>
     
      <div className={styles.grid}>
        {addresses.map((item, index) => (
          <article key={index} className={styles.card}>
            <div className={styles.head}>
              <h2>{item.type}</h2>

              {editIndex === index ? (
                <button onClick={handleSave}> save </button>
              ) : (
              <button onClick={() => handleEdit(index)}>
                Edit
              </button>
              )}
            </div>
            {editIndex === index ? (
              <>
                <input
                  name="street"
                  value={editedAddress.street}
                  onChange={handleChange}
                  placeholder="Street"
                />
                <input
                  name="name"
                  value={editedAddress.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
                <input
                  name="country"
                  value={editedAddress.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
                <input
                  name="email"
                  value={editedAddress.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  name="phone"
                  value={editedAddress.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
              </>
            ) : (
              <>
                <p>{item.street}</p>
                <p>{item.name}</p>
                <p>{item.country}</p>
                <p className={styles.spacer}>{item.email}</p>
                <p>{item.phone}</p>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
