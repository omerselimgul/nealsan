import React, { useEffect, useState } from "react";
import { HomeLayout } from "../../layouts";
import { Button, Card, Input } from "../../mui-base";
import { IconButton, InputAdornment } from "@mui/material";
import { SearchIcon } from "../../mui-base/Icons";
import { WrapperContainer } from "../../components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
const Categories = [
  {
    name: "Teknoloji",
    id: 1,
  },
  {
    name: "Giyim",
    id: 2,
  },
  {
    name: "Kozmetik",
    id: 3,
  },
  {
    name: "Mobilya",
    id: 4,
  },
  {
    name: "Aksesuar",
    id: 5,
  },
];
const HomePage = ({ isNotAuth }) => {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const [selected, setSelected] = useState();
  const [filtre, setFiltre] = useState({});
  const productsCollcetionRef = collection(db, "Products");

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (filtre) {
      let data = [];
      products.map((product) => {
        let check = true;
        Object.keys(filtre).map((key) => {
          if (key === "ProductName") {
            if (
              !product[key].toLowerCase().includes(filtre[key].toLowerCase())
            ) {
              check = false;
            }
          } else if (product[key] !== filtre[key]) {
            check = false;
          }
        });
        if (check) {
          data.push(product);
        }
      });
      setFilteredData([...data]);
    } else {
      setFilteredData([...products]);
    }
  }, [filtre]);

  const getProducts = async () => {
    const coll = await getDocs(productsCollcetionRef);

    setProducts(coll.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setFilteredData(coll.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const inputFilterHandler = (field, value) => {
    if (value) {
      setFiltre({ ...filtre, [field]: value });
    } else {
      delete filtre[field];
      setFiltre({ ...filtre });
    }
  };

  const filterHandler = (field, value) => {
    if (value && selected !== value) {
      setFiltre({ ...filtre, [field]: value });
      setSelected(value);
    } else {
      delete filtre[field];
      setFiltre({ ...filtre });
      setSelected(null);
    }
  };
  return (
    <React.Fragment>
      <WrapperContainer
        sx={{
          backgroundColor: "#edf9f8",
          padding: "2% 4%",
        }}
        ContentCenter
        AlignItemsCenter
      >
        <Input
          xs={3}
          label="Ne alsan?"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(event) =>
            inputFilterHandler("ProductName", event.target.value)
          }
        />

        <Button
          xs={1.8}
          variant="contained"
          label={Categories[0].name}
          size="large"
          sx={{
            backgroundColor: "#84C7C4",
            margin: "3px",
          }}
          onClick={(event) => filterHandler("Category", Categories[0].id)}
        />
        <Button
          xs={1.8}
          variant="contained"
          label={Categories[1].name}
          size="large"
          sx={{ backgroundColor: "#84C7C4", margin: "3px" }}
          onClick={(event) => filterHandler("Category", Categories[1].id)}
        />
        <Button
          xs={1.8}
          variant="contained"
          label={Categories[2].name}
          size="large"
          sx={{ backgroundColor: "#84C7C4", margin: "3px" }}
          onClick={(event) => filterHandler("Category", Categories[2].id)}
        />
        <Button
          xs={1.8}
          variant="contained"
          label={Categories[3].name}
          size="large"
          sx={{ backgroundColor: "#84C7C4", margin: "3px" }}
          onClick={(event) => filterHandler("Category", Categories[3].id)}
        />
        <Button
          xs={1.8}
          variant="contained"
          label={Categories[4].name}
          size="large"
          sx={{ backgroundColor: "#84C7C4", margin: "3px" }}
          onClick={(event) => filterHandler("Category", Categories[4].id)}
        />
      </WrapperContainer>
      <WrapperContainer sx={{ padding: "2% 4%" }} AlignItemsCenter>
        {filteredData?.map((product) => {
          return (
            <Card
              productId={product.id}
              xs={3}
              image={product.Path}
              description={product.ProductName}
              price={product.Price}
              stock={product.Stock}
              Path={product.Path}
              Icon={isNotAuth ? "" : "AddCart"}
            />
          );
        })}
      </WrapperContainer>
    </React.Fragment>
  );
};

export default HomePage;
