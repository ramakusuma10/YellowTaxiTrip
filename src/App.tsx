import { useEffect, useState, useCallback } from 'react';
import MapView from './component/Map-view'
import Filter from './component/Filter';
import { fetchAllTrips, fetchTripsFilter } from './libs/api';
import './global.css';
import Swal from 'sweetalert2';
import Loading from './component/Loading';
import Legend from './component/Legend';

interface TripFilters {
    pickupTime: string | null;
    dropoffTime: string | null;
    fareRange: [number, number];
    distanceRange: [number, number];
    paymentType: string | null;
}

function App(){
    const [trips, setTrips] = useState<any[]>([]);
    const [filteredTrips, setFilteredTrips] = useState<any[]>([]);
    const [filters, setFilters] = useState<TripFilters>({
      pickupTime: null,
      dropoffTime: null,
      fareRange: [0, 50],
      distanceRange: [0, 10],
      paymentType: null,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [filterKey, setFilterKey] = useState<number>(0);

    useEffect(function () {
        const fetchInitialTrips = async function () {
            try {
                const data = await fetchAllTrips();
                setTrips(data);
                setFilteredTrips(data);
            } catch (error) {
                console.error("Error fetching trips:", error);
            }
        };

        fetchInitialTrips();
    }, []);

    const applyFilters = useCallback(async function () {
        setLoading(true);
        try {
            const data = await fetchTripsFilter({
                payment_type: filters.paymentType || "",
                pickup_datetime: filters.pickupTime || "",
                dropoff_datetime: filters.dropoffTime || "",
                min_fare: filters.fareRange[0],
                max_fare: filters.fareRange[1],
                min_distance: filters.distanceRange[0],
                max_distance: filters.distanceRange[1],
            });
            setFilteredTrips(data);
        } catch (error) {
            handleFetchError();
        } finally {
            setLoading(false);
        }
    }, [filters]);

    function handleFetchError() {
        Swal.fire({
            icon: 'error',
            title: 'Sorry...',
            text: 'Trip Not Found',
        }).then(function () {
            resetFilters();
        });
    }

    function resetFilters() {
        setFilters({
            pickupTime: null,
            dropoffTime: null,
            fareRange: [0, 50],
            distanceRange: [0, 10],
            paymentType: null,
        });
        setFilteredTrips(trips);
        setFilterKey(function (prevKey) {
            return prevKey + 1;
        });
    }

    useEffect(function () {
        applyFilters();
    }, [filters, applyFilters]);

    return (
        <div className="app-container">
            <Filter key={filterKey} filters={filters} setFilters={setFilters} />
            {loading && <Loading />}
            <MapView trips={loading ? [] : filteredTrips} />
            <Legend />
        </div>
    );
}

export default App;