import React, { useState, useContext, useEffect } from "react";
import { Skeleton, Table, Button, Input } from "antd";
import { useQuery } from "react-query";
import { GetProductsAll } from "../../services/api/get";
import { Context } from "../../components/context/Context";
import { get } from "lodash";
import { Controller, useForm } from "react-hook-form";
import sortAlphaNum from "../../hooks/useSort";

const Home = () => {
  const { user } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState([]);
  const { dispatch } = useContext(Context);
  const { handleSubmit, control } = useForm();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      onHeaderCell: (column) => {
        return {
          onClick: () => {
            setSearchData(get(data, "data.items", []).sort(sortAlphaNum));
          },
        };
      },
    },
    {
      title: "Category",
      dataIndex: "importRecord",
      key: "importRecord",
      render: (value) => get(value, "categoryNames[0]"),
    },
    {
      title: "Count",
      dataIndex: "importRecord",
      key: "importRecord",
      render: (value) => get(value, "count"),
    },
    {
      title: "Count",
      dataIndex: "importRecord",
      key: "importRecord",
      render: (value) =>
        get(value, "landedCostPrice[USD]") +
        get(value, "landedCostPrice[order[1]]"),
    },
    {
      title: "Type",
      dataIndex: "importRecord",
      key: "importRecord",
      render: (value) => get(value, "productProperties[0].value"),
    },
    {
      title: "Sex",
      dataIndex: "importRecord",
      key: "importRecord",
      render: (value) => get(value, "productProperties[1].value"),
    },
    {
      title: "Size",
      dataIndex: "importRecord",
      key: "importRecord",
      render: (value) => get(value, "variationProperties[0].value"),
    },
    {
      title: "Color",
      dataIndex: "importRecord",
      key: "importRecord",
      render: (value) => get(value, "variationProperties[1].value"),
    },
  ];
  //GET DATA
  const headers = {
    Authorization: `Bearer ${user}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const { data, isSuccess, isLoading } = useQuery(
    "products",
    () => GetProductsAll(`/variations?page=${currentPage}&size=${30}`, headers),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    setSearchData(get(data, "data.items"));
    //eslint-disable-next-line
  }, [isSuccess]);

  //Pagination handle
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  //Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure to log out?")) {
      dispatch({ type: "LOGOUT" });
    } else {
      console.log("cancel");
    }
  };

  // Search
  const hanleSearch = handleSubmit((value) => {
    let newArray = [];
    for (let index = 0; index < get(data, "data.items").length; index++) {
      if (
        get(get(data, "data.items")[index], "name")
          .toLowerCase()
          .includes(value.search.toLowerCase())
      ) {
        newArray = [...newArray, get(data, "data.items")[index]];
      }
    }
    setSearchData(newArray);
  });

  return (
    <>
      <form onSubmit={hanleSearch}>
        <Controller
          placeholder="Search"
          control={control}
          name="search"
          render={({ field }) => (
            <Input
              placeholder="input search text"
              style={{ width: 200 }}
              {...field}
            />
          )}
        />
        <Button htmlType="submit">Seach</Button>
      </form>

      <Table
        columns={columns}
        rowKey={(item) => item.id}
        dataSource={isSuccess && searchData}
        onChange={handleTableChange}
        pagination={{ current: currentPage, pageSize: 10 }}
        locale={{
          emptyText: isLoading && <Skeleton active={true} />,
        }}
      />
      <Button type="primary" onClick={handleLogout}>
        Log out
      </Button>
    </>
  );
};

export default Home;
