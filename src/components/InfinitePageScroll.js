import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import "./commonStyles.css";

export default function InfinitePageScroll(props) {
  const totalCountPeople = 45;
  const PAGE_LIMIT = 10;
  const apiPath = "https://randomuser.me/api/";

  const [people, setPeople] = useState([]);

  const getPeopleList = () => {
    let pageUpdate = PAGE_LIMIT + 5;
    const queryParam = "?results=" + pageUpdate;

    const finalUrl = apiPath + queryParam;
    console.log({ finalUrl });

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    axios
      .get(finalUrl)
      .then(async (res) => {
        const apiRespond = res?.data;
        await sleep(1000);
        const mergeData = [...people, ...apiRespond?.results];

        mergeData.sort(function (a, b) {
          const nameA = a.name.first.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.first.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        // mergeData.sort(dynamicSort("name.first"));
        console.log("API Response", mergeData);
        setPeople(mergeData);
      })
      .catch((err) => {
        console.log("Error!!!!", err);
      });
  };

  useEffect(() => {
    getPeopleList();
  }, []);

  const fetchMoreData = () => {
    if (people.length < totalCountPeople) {
      getPeopleList();
    }
  };

  const filteredData = people.filter((el) => {
    //if no input the return the original
    if (props.input === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el?.name?.first?.toLowerCase()?.includes(props.input);
    }
  });

  return (
    <>
      <div className="main-container">
        <div className="row">
          <InfiniteScroll
            dataLength={people.length}
            next={fetchMoreData}
            style={{ overflow: "none" }}
            hasMore={people.length < totalCountPeople}
            loader={
              <CircularProgress style={{ display: "flex", margin: "auto" }} />
            }
          >
            {people &&
              people.length > 0 &&
              filteredData.map((key) => {
                return (
                  <>
                    <div className="profile">
                      <div className="name-person">
                        {key?.name?.first + " " + key?.name?.last}
                      </div>
                      <div className="image">
                        <img
                          src={key?.picture?.medium}
                          aria-hidden
                          alt="image"
                        />
                      </div>
                    </div>
                  </>
                );
              })}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
