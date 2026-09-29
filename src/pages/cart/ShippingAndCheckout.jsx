    import { useContext, useState} from "react";
    import { StylesContext } from "../../contexts/StylesContext";
    import BlackButton from "../../reusedComponents/BlackButton";
    import styles from "./ShippingAndCheckout.module.css"
    import useCartStore from "../../stores/cartItemsStore";

export default function ShippingAndCheckout() {

    const cartItems = useCartStore((state) => state.cartItems);
    const clearCart = useCartStore((state) => state.clearCart);

    const {currentUser, setCartState, setOrders, togglePanel } = useContext(StylesContext)
    const [paymentMethod, setPaymentMethod] = useState("");

    const [error, setError] = useState({});

    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem("saveAddress");
        return savedData ? JSON.parse(savedData) : {
            firstName: "",
            lastName: "",
            country: "",
            streetAddress: "",
            townCity: "",
            postcode: "",
            province: "",
            phone: "",
            email: "",
            saveAddress: false,
            orderNotes: "",
        };
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));    
    };

    const fixedCartItems = cartItems.map(item => ({
        style: item.style || "Unknown Product",
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        discount: Number(item.discount) || 0,
        image: item.image,
        color: item.color || "N/A",
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
    }));

    const subtotal = fixedCartItems.reduce((acc, item) => {
        const quantity = item.quantity || 1;
        const priceAfterDiscount = item.discount ? (Number(item.price) - (Number(item.discount/100)*Number(item.price))) : Number(item.price);
        return acc + priceAfterDiscount * quantity;
    }, 0);
    const vat = subtotal * 0.18;
    const total = subtotal + vat;


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            alert("Your cart is empty")
            return;
        }

        let missingFields = {};
        
        if (!formData.firstName) {
            missingFields.firstName = "true";
        }

        if (!formData.lastName) {
            missingFields.lastName = "true";
        }

        if (!formData.addressLine1) {
            missingFields.addressLine1 = "true";
        }

        if (!formData.townCity) {
            missingFields.townCity = "true";
        }

        if (!formData.postcode) {
            missingFields.postcode = "true";
        }

            if (!formData.province) {
            missingFields.province = "true";
        }

        if (!formData.phone) {
            missingFields.phone = "true";
        }

        if (!formData.email) {
            missingFields.email = "true";
        }

        if (!paymentMethod) {
            alert("Please select a payment method to proceed.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            missingFields.email = "Enter a valid email address";
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            missingFields.phone = "Enter a valid 10-digit phone number";
        }

        setError(missingFields);

        if (Object.keys(missingFields).length > 0) {
            return;
        }

        if (!currentUser){
            togglePanel("login");
        }

        const orderData = {
            _id: Math.floor(Math.random() * 100000),
            date: new Date().toLocaleDateString(),
            email: formData.email,
            paymentMethod: paymentMethod,
            cartItems: fixedCartItems,
            subtotal,
            vat,
            total,
            customer: {
                ...formData,
                streetAddress: formData.addressLine1,
                postCode: formData.postcode,
            },
            status: "Placed",
            userId: currentUser._id
        };

        try {
            const response = await fetch('https://uomo-backend-91j6.onrender.com/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok && data.success) {
                setOrders(prevOrders => [...prevOrders, data.orders]);
                localStorage.setItem("orderData", JSON.stringify(orderData));
                if (formData.saveAddress) {
                    localStorage.setItem("saveAddress", JSON.stringify(formData));
                } else {
                    localStorage.removeItem("saveAddress");   
                }

                setFormData({
                    firstName: "",
                    lastName: "",
                    companyName: "",
                    country: "",
                    streetAddress: "",
                    townCity: "", 
                    postcode: "",
                    province: "", 
                    phone: "",    
                    email: "",
                    saveAddress: false,
                    orderNotes: "",
                });

                setError({});
                setPaymentMethod("");
                clearCart();
                setCartState("confirmation");
            }else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Unable to place order. Please try again.");
        }

    };

    return (

        <div className={styles.divider}>
            <div>
                <h1 className={styles.h1}>BILLING DETAILS</h1>
                <br />
                <form className={styles.form} onSubmit={handleSubmit}  >    
                    <div>
                        <input className={`${styles.input} flex-1 ${error.firstName ? styles.errorInput : ""} `} type="text" placeholder="First Name" name="firstName" onChange={handleChange} value={formData.firstName} required />
                        {error.firstName && ""}
                        <input className={`${styles.input} flex-1 ${error.lastName ? styles.errorInput : ""} `} type="text" placeholder="Last Name" name="lastName" onChange={handleChange} value={formData.lastName} required />
                        {error.lastName && ""}
                    </div>
                    <input className={ `${styles.input} ${error.addressLine1 ? styles.errorInput : ""} `}  type="text" name="addressLine1" onChange={handleChange} value={formData.addressLine1 || formData.streetAddress || ""} placeholder="Street Address Line 1 *" required />
                    {error.addressLine1 && ""}
                    <input className={styles.input} type="text" placeholder="Street Address Line 2 (Optional)" name="addressLine2" onChange={handleChange} value={formData.addressLine2} />
                    {error.addressLine2 && ""}
                    <input className={ `${styles.input} ${error.townCity ? styles.errorInput : ""} `} type="text" name="townCity" onChange={handleChange} value={formData.townCity} placeholder="Town/City *" required />
                    {error.townCity && ""}
                    <input className={ `${styles.input} ${error.postcode ? styles.errorInput : ""} `} type="text" name="postcode" onChange={handleChange} value={formData.postcode} placeholder="Postcode/ZIP *" required />
                    {error.postcode && ""}
                    <input className={ `${styles.input} ${error.province ? styles.errorInput : ""} `} type="text" name="province" onChange={handleChange} value={formData.province} placeholder="Provience *" required />
                    {error.province && "" }
                    <input className={` ${styles.input} ${error.phone ? styles.errorInput : ""} `} type="tel" name="phone" maxLength={10} onChange={handleChange} value={formData.phone} placeholder="Phone *" required />
                    {error.phone && (<p style={{color:"red", fontSize:"10px"}}>{error.phone}</p>)}
                    <input className={` ${styles.input} ${error.email ? styles.errorInput : ""} `} type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Your Mail" required />
                    {error.email && (<p style={{color:"red", fontSize:"10px"}}>{error.email}</p>)}
                    <h1><label><input type="checkbox" name="saveAddress" id="saveAddress" checked={formData.saveAddress} onChange={handleChange} /> Save Address</label></h1>
                    <textarea className={`h-40 ${styles.input}`} name="orderNotes" value={formData.orderNotes} onChange={handleChange} id="" placeholder="Order Notes (optional)"></textarea>
                </form>   
           
            </div>

            <div className={styles.orderdetails}>
                <div className={styles.table1}>
                    <p className={styles.h11}>YOUR ORDER</p>
                    <p className={styles.tableCell}>Product <span>Total</span></p>
                    <hr className={styles.hr} />


                    {fixedCartItems.map((item, index) => (
                        <p className={`text-gray-400 ${styles.tableCell}`} key={index}>
                            {item.style} {"\u00D7"} {item.quantity} <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </p>
 
                    ))}

                    <hr className={styles.hr} />

                    <p className={styles.tableCell}>Subtotal <span>${subtotal.toFixed(2)}</span></p>
                    <hr className={styles.hr} />
                    <p className={styles.tableCell}>Shipping <span className={styles.shipping}>Free shipping</span></p>
                    <hr className={styles.hr} />
                    <p className={styles.tableCell}>VAT <span>${vat.toFixed(2)}</span></p>
                    <hr className={styles.hr} />
                    <p className={styles.tableCell}>Total <span>${total.toFixed(2)}</span></p>
                </div>

                <div className={styles.bankTransfer}>
                    <h1><label><input type="radio" onChange={(e) => setPaymentMethod(e.target.value)} name="payment" value="bankTransfer" /> Direct Bank Transfer</label></h1>
                    <p className={styles.p1}>Make your payment directly into our bank <br />
                        account. Please use your Order ID as the <br />
                        payment reference. Your order will not be <br />
                        shipped until the funds have cleared in our <br />
                        account.</p>
                    <h1><label ><input type="radio" name="payment" value="checkPayments" onChange={(e) => setPaymentMethod(e.target.value)} />Check payments</label></h1>
                    <h1><label><input type="radio" name="payment" value="cashOnDelivery" onChange={(e) => setPaymentMethod(e.target.value)} />Cash on delivery</label></h1>
                    <h1><label><input type="radio" name="payment" value="payPal" onChange={(e) => setPaymentMethod(e.target.value)} />PayPal</label></h1>
                    <p>Your personal data will be used to process your order, support your <br />
                        experience throughout this website, and for other purposes <br />
                        described in our <span className={styles.policy}>privacy policy.</span></p>
                </div>
                <div className={styles.placeOrderBtn}><BlackButton onClick={handleSubmit} >
                    PLACE ORDER
                </BlackButton></div>
            </div>
        </div>
    )
}
