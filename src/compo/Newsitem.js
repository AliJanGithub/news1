import React, { Component } from 'react';

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div>
        <div className="card" style={{ width: '18rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <img
            src={
              !imageUrl
                ? 'https://images.macrumors.com/t/rsVF5zSOxqabm37AgyNQWmw0p8U=/2500x/article-new/2022/11/12.9-inch-ipad-pro-cyber.jpg'
                : imageUrl
            }
            className="card-img-top"
            alt="Sports"
            style={{ height: '150px', objectFit: 'cover' }} // Fixed height and cover to maintain aspect ratio
          />
          <div className="card-body" style={{ flex: '1' }}>
            <h5 className="card-title" style={{ minHeight: '40px' }}>
              {title ? title : 'No title available'} {/* Set minimum height for consistent card title height */}
            </h5>
            <p className="card-text" style={{ minHeight: '70px', overflow: 'hidden' }}>
              {description ? description : 'No description available'} {/* Set minimum height for consistent card text */}
            </p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm mt-auto">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
