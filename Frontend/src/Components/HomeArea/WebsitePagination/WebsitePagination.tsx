import { Box, Pagination } from "@mui/material";
import "./WebsitePagination.css";
import { useEffect, useState } from "react";
import { paginationService } from "../../../Services/PaginationService";
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";

export function WebsitePagination({ setVacations }: any): JSX.Element {

    // Defined component variables:
    const cardsPerPage = 9;
    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: cardsPerPage
    });

    useEffect(() => { /* Set pagination on initial */        
        const countAndData = paginationService.getPagination(pagination.from, pagination.to);
        setPagination({ ...pagination, count: countAndData.count });
        setVacations(countAndData.data)
    }, [pagination.from, pagination.to]);


    const handlePageChange = (event: any, page: number) => {
        const from = (page - 1) * cardsPerPage; // Start card
        const to = (page - 1) * cardsPerPage + cardsPerPage; // End card
        setPagination({ ...pagination, from: from, to: to });        
        window.scrollTo(0, 0); // Scroll to top when user move to other page
    }

    return (
        <div className="WebsitePagination">
            <Box sx={AppComponentsStyle.paginationBox} >
                <Pagination
                    count={Math.ceil(pagination.count / cardsPerPage)}
                    onChange={handlePageChange}
                />
            </Box>
        </div>
    );
}
