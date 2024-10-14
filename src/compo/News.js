import React, { Component } from 'react';
import Newsitem from './Newsitem';

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  // Function to fetch news articles
  fetchNews = async () => {
    const { page } = this.state;
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=da546f9be7ae4c4487452e71de7a02dd&page=${page}&pageSize=20`;
      this.setState({ loading: true });
      let data = await fetch(url);
      
      // Checking if the response is OK (status 200)
      if (!data.ok) {
        throw new Error(`Error fetching data: ${data.statusText}`);
      }

      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles || [], // If parsedData.articles is undefined, use an empty array
        totalResults: parsedData.totalResults || 0, // If parsedData.totalResults is undefined, use 0
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false }); // Stop loading state in case of an error
    }
  };

  handleNext = () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 20)) {
      this.setState(
        (prevState) => ({
          page: prevState.page + 1,
        }),
        () => {
          this.fetchNews();
        }
      );
    }
  };

  handlePrev = () => {
    if (this.state.page > 1) {
      this.setState(
        (prevState) => ({
          page: prevState.page - 1,
        }),
        () => {
          this.fetchNews();
        }
      );
    }
  };

  render() {
    const { articles, loading } = this.state;

    return (
      <>
        <div className="container">
          <h1 className="container my-3 text-dark">Top Headlines</h1>
          {loading && <h2>Loading...</h2>} {/* Display a loading message while fetching news */}
          <div className="row my-3">
            {articles.length > 0 ? (
              articles.map((element) => {
                return (
                  <div className="col md-4 my-1" key={element.url}>
                    <Newsitem
                      newsUrl={element.url}
                      imageUrl={element.urlToImage}
                      title={element.title ? element.title.slice(0, 20) : "No title available"}
                      description={element.description ? element.description.slice(0, 50) : "No description available"}
                    />
                  </div>
                );
              })
            ) : (
              !loading && <h2>No articles available.</h2> // Show message if no articles and not loading
            )}
          </div>
        </div>
        <div className="d-flex justify-content-around">
          <button
            onClick={this.handlePrev}
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-primary"
          >
            &laquo; Previous
          </button>
          <button
            type="button"
            onClick={this.handleNext}
            className="btn btn-primary"
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)}
          >
            Next &raquo;
          </button>
        </div>
      </>
    );
  }
}

export default News;
