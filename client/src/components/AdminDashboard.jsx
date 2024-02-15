import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';


export default function AdminDashboard() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (!localStorage.getItem("AdminToken")) {
            navigate("/admin/login");
            return;
        }
        axios.get('http://localhost:8500/products')
            .then(response => {
                console.log(response);
                setProducts(response.data.products);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [navigate])

    function deleteProduct(id) {
        if (!localStorage.getItem("AdminToken")) {
            navigate("/admin/login");
            return;
        }
        const Token = localStorage.getItem("AdminToken");

        fetch("http://localhost:8500/product/delete", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ Token, id })
        })
            .then((res) => {
                if (res.status !== 200) {
                    return navigate("admin/dashboard");
                }
                toast.success("Deleted")
                res.json()
                setProducts(res.products);
            })
            .catch((err) => {
                console.log(err);
                return navigate("/signup");
            });
    }

  return (
    <>
    <AdminNavbar/>
    <main className='w-full flex items-center flex-col p-4'>
                <div className='max-w-screen-2xl p-4 bg-slate-300 rounded flex flex-wrap gap-5'>
                    {products && products.map((item) => {
                        return (
                            <Card sx={{ maxWidth: 300 }} className='min-w-[350px] p-2'>
                                <CardMedia
                                    sx={{ height: 'auto', width: '100%', objectFit: 'contain' }}
                                    component="img" 
                                    src={item.imageURL}
                                    alt={item.Name} 
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
                                    <Button onClick={() => deleteProduct(item._id)} size="small" className='bg-blue-700 mt-4 transition ease-in-out delay-80 hover:scale-105 text-white p-2 rounded-lg'>Delete</Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                </div>
            </main>
    </>
  )
}
