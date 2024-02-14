import React, { useEffect, useState } from 'react'

function Cart() {
  const [products, setProducts] = useState([])
  

  useEffect(() => {
    const Token = localStorage.getItem("Token")

    fetch("http://localhost:8500/get/cart", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({Token})
    }).then((res) => {
      if (res.status !== 200) {
        return redirect("/login");
      }
      return res.JSON()
    }).then((res) => {
      setProducts(res.products)
    })
      .catch((err) => {
        console.log(err);
        return redirect("/signup");
      })
  }, [])

  return (
    <>
        <Navbar />
        <main className='w-full flex items-center flex-col p-4'>
            <div className='max-w-screen-2xl p-4 bg-slate-300 rounded flex flex-wrap gap-5'>
                {products && products.map((item) => {
                    return (
                        <div>
                    )
                })}
            </div>
        </main>
        </>
  )
}

export default Cart