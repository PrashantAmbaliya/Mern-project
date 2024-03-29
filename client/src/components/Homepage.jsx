import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8500/products')
            .then(response => {
                console.log(response);
                setProducts(response.data.products);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [])

    function AddtoCart(id) {
        if (!localStorage.getItem("Token")) {
            navigate("/login");
            return;
        }
        const Token = localStorage.getItem("Token");

        fetch("http://localhost:8500/addtocart", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ Token, id })
        })
            .then((res) => {
                if (res.status !== 200) {
                    return navigate("/signup");
                }
                toast.success("Added")
                return res.json();
            })
            .catch((err) => {
                console.log(err);
                return navigate("/signup");
            });
    }

    return (
        <>
            <Navbar />
            <main className='w-full flex items-center flex-col p-4'>
                <div className='max-w-screen-2xl p-4 bg-slate-300 rounded flex flex-wrap gap-5'>
                    {products && products.map((item) => {
                        return (
                            <Card sx={{ maxWidth: 300 }} className='min-w-[350px] p-2'>
                                <CardMedia
                                    sx={{ height: 'auto', width: '100%', objectFit: 'contain' }}
                                    component="img" // Ensure that the CardMedia component is treated as an image
                                    src={item.imageURL} // Use 'src' instead of 'image'
                                    alt={item.Name} // Use 'alt' instead of 'title'
                                />
                                <CardContent>
                                    <Typography fontWeight="bold" gutterBottom variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        ₹ {item.basePrice}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => AddtoCart(item._id)} size="small" className='bg-blue-700 mt-4 transition ease-in-out delay-80 hover:scale-105 text-white p-2 rounded-lg'>Add To Cart</Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                </div>
            </main>
        </>
    )
}

export default Homepage