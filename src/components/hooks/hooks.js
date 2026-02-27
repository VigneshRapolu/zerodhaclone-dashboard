import { create } from "zustand";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const token = localStorage.getItem("token");
const allStore=create((set)=>({
    holdings:[],
    watchList:[],
    orders:[],
    user:false,
    fetchHoldings:async ()=>{
        try{
            const token = localStorage.getItem("token");
            set({loading:true});
            const res=await axios.get(`${BACKEND_URL}/holdings`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
    
});
if (!token) {
            set({ user: false, loading: false,holdings:[] });
            
            return;
        }
            
            // console.log("in hooks",res.data);
           
            set({holdings:res.data,
                loading:false,
            })
        }catch(err){
            console.log(err);
            
            set({loading:false})
        }
    },
    fetchWatchList:async ()=>{
        try{
            // console.log("fetching watchlist");
            
            set({loading:true});
            const watchListRes=await axios.get(`${BACKEND_URL}/watchlist`,{withCredentials:true});
            // console.log("the data at fetching for watchlist",watchListRes.data);
            
            set({watchList:watchListRes.data,loading:false});
        }catch(err){
            console.log(err);
            set({loading:false});
        }
    },
    fetchOrders:async ()=>{
        try{
            // console.log("fetching orders");
            const token = localStorage.getItem("token");
            set({loading:true});
            if (!token) {
            set({ user: false, loading: false,orders:[] });
            return;
        }
            const orderRes=await axios.get(`${BACKEND_URL}/orders`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

            console.log(orderRes.data);
            
            set({orders:orderRes.data,loading:false});
        }catch(err){
            console.log(err);
            set({loading:false});
        }
    },
    makeUser:async(value)=>{
        try{
            set({loading:true});
            set({user:value,loading:false});
        }catch(err){
            set({user:false});
            set({loading:false});
        }
    }
}));
export default allStore;