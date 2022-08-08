import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const AddNew = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);

  const senderStreet = useRef("");
  const senderCity = useRef("");
  const senderPostalCode = useRef("");
  const senderCountry = useRef("");
  const clientName = useRef("");
  const clientEmail = useRef("");
  const clientStreet = useRef("");
  const clientCity = useRef("");
  const clientPostalCode = useRef("");
  const clientCountry = useRef("");
  const description = useRef("");
  const createdAt = useRef("");
  const paymentTerms = useRef("");

  // add product item
  const addItem = () => {
    setItems([...items, { name: "", quantity: 0, price: 0, total: 0 }]);
  };

  // handler change
  const handlerChange = (event, i) => {
    const { name, value } = event.target;
    const list = [...items];
    list[i][name] = value;
    list[i]["total"] = list[i]["quantity"] * list[i]["price"];
    setItems(list);
  };

  // delete product item
  const deleteItem = (i) => {
    const inputData = [...items];
    inputData.splice(i, 1);
    setItems(inputData);
  };

  // total amount of all product items
  const totalAmount = items.reduce((acc, curr) => acc + curr.total, 0);

  // submit data to the database
  const createInvoice = async (status) => {
    try {
      if (
        senderStreet.current.value === "" ||
        senderCity.current.value === "" ||
        senderPostalCode.current.value === "" ||
        senderCountry.current.value === "" ||
        clientName.current.value === "" ||
        clientEmail.current.value === "" ||
        clientStreet.current.value === "" ||
        clientCity.current.value === "" ||
        clientPostalCode.current.value === "" ||
        clientCountry.current.value === "" ||
        description.current.value === "" ||
        createdAt.current.value === "" ||
        items.length === 0
      ) {
        toast.warning("All fields are required. Must provide valid data");
      } else {
        const res = await fetch("/api/add-new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderStreet: senderStreet.current.value,
            senderCity: senderCity.current.value,
            senderPostalCode: senderPostalCode.current.value,
            senderCountry: senderCountry.current.value,
            clientName: clientName.current.value,
            clientEmail: clientEmail.current.value,
            clientStreet: clientStreet.current.value,
            clientCity: clientCity.current.value,
            clientPostalCode: clientPostalCode.current.value,
            clientCountry: clientCountry.current.value,
            description: description.current.value,
            createdAt: createdAt.current.value,
            paymentDue: createdAt.current.value,
            paymentTerms: paymentTerms.current.value,
            status: status,
            items: items,
            total: totalAmount,
          }),
        });
        const data = await res.json();

        toast.success(data.message);
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="main__container">
      <div className="new__invoice">
        <div className="new__invoice-header">
          <h3>New Invoice</h3>
        </div>

        {/* ======== new invoice body ========= */}
        <div className="new__invoice-body">
          {/* ======= bill from ========== */}
          <div className="bill__from">
            <p className="bill__title">Bill from</p>
            <div className="form__group">
              <p>Street Address</p>
              <input type="text" ref={senderStreet} />
            </div>

            <div className="form__group inline__form-group">
              <div>
                <p>City</p>
                <input type="text" ref={senderCity} />
              </div>

              <div>
                <p>Postal Code</p>
                <input type="text" ref={senderPostalCode} />
              </div>

              <div>
                <p>Country</p>
                <input type="text" ref={senderCountry} />
              </div>
            </div>
          </div>

          {/* ========= bill to ========== */}
          <div className="bill__to">
            <p className="bill__title">Bill to</p>
            <div className="form__group">
              <p>Client Name</p>
              <input type="text" ref={clientName} />
            </div>

            <div className="form__group">
              <p>Client Email</p>
              <input type="email" ref={clientEmail} />
            </div>

            <div className="form__group">
              <p>Street Address</p>
              <input type="email" ref={clientStreet} />
            </div>

            <div className="form__group inline__form-group">
              <div>
                <p>City</p>
                <input type="text" ref={clientCity} />
              </div>

              <div>
                <p>Postal Code</p>
                <input type="text" ref={clientPostalCode} />
              </div>

              <div>
                <p>Country</p>
                <input type="text" ref={clientCountry} />
              </div>
            </div>

            <div className="form__group inline__form-group">
              <div className="inline__group">
                <p>Invoice Date</p>
                <input type="date" ref={createdAt} />
              </div>

              <div className="inline__group">
                <p>Payment Terms</p>
                <input type="text" ref={paymentTerms} />
              </div>
            </div>

            <div className="form__group">
              <p>Project Description</p>
              <input type="text" ref={description} />
            </div>
          </div>

          {/* ========= invoice product items =========*/}

          <div className="invoice__items">
            <h3>Item List</h3>
            {items?.map((item, i) => (
              <div className="item" key={i}>
                <div className="form__group inline__form-group">
                  <div>
                    <p>Item Name</p>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Qty</p>
                    <input
                      type="number"
                      name="quantity"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Price</p>
                    <input
                      type="number"
                      name="price"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>
                  <div>
                    <p>Total</p>
                    <h4>{item.total}</h4>
                  </div>

                  <button className="edit__btn" onClick={() => deleteItem(i)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="add__item-btn" onClick={addItem}>
            Add New Item
          </button>

          <div className="new__invoice__btns">
            <button className="edit__btn" onClick={() => router.push("/")}>
              Discard
            </button>
            <div>
              <button
                className="draft__btn"
                onClick={() => createInvoice("draft")}
              >
                Save as Draft
              </button>

              <button
                className="mark__as-btn"
                onClick={() => createInvoice("pending")}
              >
                Send & Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
