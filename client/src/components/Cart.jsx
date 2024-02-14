import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter, Image, Button, Stack, Heading, Text } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

function Cart() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState('SAVE10');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Fetch cart products and calculate total without discount
    const fetchCartProducts = async () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetch("http://localhost:8500/get/cart", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ Token: token })
        });
        if (!res.ok) {
          throw new Error('Failed to fetch cart');
        }
        const data = await res.json();
        setProducts(data.cart);
        let totalAmount = 0;
        data.cart.forEach((item) => {
          totalAmount += item.basePrice;
        });
        setTotal(totalAmount);
      } catch (error) {
        console.error(error);
        navigate("/signup");
      }
    };
    fetchCartProducts();
  }, []);

  const applyCoupon = () => {

    if (coupon === 'SAVE10') {
      const discountAmount = total * 0.1;
      setDiscount(discountAmount);
    } else {
      alert('Invalid coupon code');
    }
  };

  return (
    <>
      <Navbar />
      <ChakraProvider>
      <main className='w-full flex items-center flex-col p-4 gap-5'>
        <div className='max-w-screen-2xl p-4 bg-slate-300 rounded flex flex-wrap gap-5'>
          {products && products.map((item, index) => (
            <div key={index} className='w-full border flex-col gap-2 items-start justify-between rounded-md'>
              <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
              >
                <Image
                  objectFit='cover'
                  maxW={{ base: '100%', sm: '200px' }}
                  src={item.imageURL}
                  alt='Product Image'
                />

                <Stack>
                  <CardBody>
                    <Heading size='md'>{item.name}</Heading>

                    <Text py='2'>
                      {item.description}
                    </Text>

                    <Heading size='md'>₹. {item.basePrice}</Heading>
                  </CardBody>

                  <CardFooter>
                    <Button variant='solid' colorScheme='blue'>
                      Remove
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            </div>
          ))}
        </div>
        <div className='flex justify-between items-center gap-4'>
          <h1 className='text-2xl font-bold'>Apply coupon</h1>
          <span className='felx justify-center items-center'>
            <input type="text" name="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} className='border-2 border-gray-100  text-black shadow-lg p-2 rounded-lg focus:outline-none autofocus' />
            <button onClick={applyCoupon} className='bg-blue-700 mb-1 mt-4  transition ease-in-out delay-80 hover:scale-105 text-white p-2 rounded-lg'>Apply</button>
          </span>
        </div>
        <div className='flex justify-between min-w-[500px] items-center'>
          <h1 className='text-2xl font-bold'>Total Amount: ₹{total - discount}</h1>
          <button className='bg-blue-700 mb-1 mt-4 w-[150px] transition ease-in-out delay-80 hover:scale-105 text-white p-2 rounded-lg'>Buy</button>
        </div>
      </main>
      </ChakraProvider>
    </>
  );
}

export default Cart;
