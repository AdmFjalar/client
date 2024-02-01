// BlogPosts Component (BlogPosts.jsx)
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import PostCard from "./PostCard";
import BackgroundOverlay from "./BackgroundOverlay";
import SelectedPost from "./SelectedPost";
import FilterMenu from "./FilterMenu";
import SortMenu from "./SortMenu";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [sortOption, setSortOption] = useState({
    sortBy: "lastupdated",
    sortOrder: "desc",
  });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filterGenres, setFilterGenres] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]); // State to store unique genres

  useEffect(() => {
    let apiUrl = "http://localhost:9000/api/posts";

    if (selectedGenres.length > 0) {
      // Build a query string to ensure all selected genres are present in each post
      const genreQuery = selectedGenres
        .map((genre) => `genres=${genre}`)
        .join("&");
      apiUrl += `?${genreQuery}`;
    }

    axios
      .get(apiUrl, { params: sortOption })
      .then((response) => {
        setPosts(response.data);

        // Extract unique genres from posts
        const uniqueGenres = Array.from(
          new Set(response.data.flatMap((post) => post.genres))
        );
        setAvailableGenres(uniqueGenres);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [sortOption, selectedGenres]);

  const handleCardClick = (post) => {
    document.body.style.overflow = "hidden";
    setSelectedPost(post);
  };

  const closeOverlay = () => {
    document.body.style.overflow = "auto";
    setSelectedPost(null);
  };

  const truncateDescription = (description) => {
    const maxLength = 150;
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  const formatLastUpdated = (timestamp) => {
    const lastUpdated = moment(timestamp);
    const daysAgo = moment().diff(lastUpdated, "days");
    const hoursAgo = moment().diff(lastUpdated, "hours");

    if (daysAgo < 365) {
      if (hoursAgo <= 1) {
        return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
      } else if (hoursAgo <= 24) {
        return `${hoursAgo} hours ago`;
      } else if (daysAgo === 1) {
        return `${daysAgo} day ago`;
      } else {
        return `${daysAgo} days ago`;
      }
    } else {
      const yearsAgo = Math.floor(daysAgo / 365);
      return `${yearsAgo} year${yearsAgo === 1 ? "" : "s"} ago`;
    }
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value.split("-");
    setSortOption({
      sortBy: selectedSort[0],
      sortOrder: selectedSort[1],
    });
  };

  const handleGenreFilter = (event, genre) => {
    event.stopPropagation();

    const decodedGenre = decodeURIComponent(genre);

    setSelectedGenres((prevGenres) => {
      if (prevGenres.includes(decodedGenre)) {
        return prevGenres.filter(
          (selectedGenre) => selectedGenre !== decodedGenre
        );
      } else {
        return [...prevGenres, decodedGenre];
      }
    });

    setFilterGenres((prevGenres) => {
      if (prevGenres.includes(decodedGenre)) {
        return prevGenres.filter(
          (selectedGenre) => selectedGenre !== decodedGenre
        );
      } else {
        return [...prevGenres, decodedGenre];
      }
    });
  };

  const handleFilterCheckboxChange = (event, genre) => {
    setFilterGenres((prevGenres) => {
      const decodedGenre = decodeURIComponent(genre);

      if (event.target.checked) {
        return [...prevGenres, decodedGenre];
      } else {
        return prevGenres.filter(
          (selectedGenre) => selectedGenre !== decodedGenre
        );
      }
    });
  };

  const updateGenreCheckbox = (genre) => {
    setSelectedGenres((prevGenres) => {
      const decodedGenre = decodeURIComponent(genre);

      if (prevGenres.includes(decodedGenre)) {
        return prevGenres.filter(
          (selectedGenre) => selectedGenre !== decodedGenre
        );
      } else {
        return [...prevGenres, decodedGenre];
      }
    });
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setFilterGenres([]);
  };

  useEffect(() => {
    let apiUrl = "http://localhost:9000/api/posts";

    if (filterGenres.length > 0) {
      const encodedGenres = filterGenres.map((genre) =>
        encodeURIComponent(genre)
      );
      apiUrl += `?genres=${encodedGenres.join(",")}`;
    }

    axios
      .get(apiUrl, { params: sortOption })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [sortOption, filterGenres]);

  return (
    <div>
      <FilterMenu
        availableGenres={availableGenres}
        filterGenres={filterGenres}
        handleFilterCheckboxChange={handleFilterCheckboxChange}
        resetFilters={resetFilters}
        Capitalize={Capitalize}
      />
      <SortMenu handleSortChange={handleSortChange} sortOption={sortOption} />
      <div className="post-cards">
        {posts.length === 0 ? (
          <h1 className="no-projects">
            <i>No projects found</i>
          </h1>
        ) : (
          posts
            .reverse()
            .map((post) => (
              <PostCard
                key={post._id}
                post={post}
                handleCardClick={handleCardClick}
                selectedPost={selectedPost}
                updateGenreCheckbox={updateGenreCheckbox}
                truncateDescription={truncateDescription}
                formatLastUpdated={formatLastUpdated}
                Capitalize={Capitalize}
              />
            ))
        )}
        {selectedPost && (
          <div className="background-overlay" onClick={closeOverlay}></div>
        )}
        {selectedPost && (
          <SelectedPost
            selectedPost={selectedPost}
            closeOverlay={closeOverlay}
            handleGenreFilter={handleGenreFilter}
            formatLastUpdated={formatLastUpdated}
            Capitalize={Capitalize}
          />
        )}
      </div>
    </div>
  );
};

export default BlogPosts;
