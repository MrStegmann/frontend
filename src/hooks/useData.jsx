import { useContext } from 'react';
import DataProvider from "../context/DataProvider";

const useData = () => {
    return useContext(DataProvider);
};

export default useData;