import React, { Component } from 'react';
import { connect } from "react-redux";
import Blurb from '../views/Blurb';
import styles from "./../../styles/HomePage.module.css";
import RelatedContent from './../views/RelatedContent';
import SearchResult from "./../views/SearchResult";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class HomePage extends Component {
    render() {
        const solutionsDesc = {
            "Adobe Advertising Cloud, Paid Media (AAC/ADCLOUD)": "Adobe Advertising Cloud is an ad management product and is part of the Adobe Marketing Cloud. It delivers a rules-based bidding solution that improves the performance of search engine marketing campaigns and is integrated with Adobe Analytics.",
            "Adobe Analytics, Dynamic Tag Management (AA)" : "Adobe Analytics provides reporting, visualizations, and analysis of Customer Data that allows Customers to discover actionable insights. Dynamic Tag Management lets marketers quickly and easily manage tags and provides innovative tools for collecting and distributing data across digital marketing systems. It also enables responsive delivery of user-specific content.",
            "Adobe Audience Manager (AAM)" : "Adobe Audience Manager helps you bring your audience data assets together, making it easy to collect commercially relevant information about site visitors, create marketable segments, and serve targeted advertising and content to the right audience. Furthermore, Audience Manager offers easy tag deployment and management with robust data collection, control, and protection.",
            "Adobe Campaign (AC)" : "Adobe Campaign provides a platform for designing cross-channel customer experiences and provides an environment for visual campaign orchestration, real time interaction management and cross channel execution.",
            "Adobe Experience Cloud (AEC)" : "Adobe Experience Cloud brings together all of your marketing tech in a single place, so you can do everything from managing your content and delivering email campaigns to automating your ad buying and measuring your success. One integrated approach for one seamless experience.",
            "Adobe Target (AT)" : "Adobe Target provides everything you need to tailor and personalize your customers' experience so you can maximize revenue on your web and mobile sites, apps, social media, and other digital channels.",
        }

        const solutionKeys = Object.keys(solutionsDesc);
        const settings = {
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 8000,
            centreMode: true,
            className: "solutions",
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        const { mostRecentDocument, learningContent } = this.props;

        return (
            <>
                <h2 className = {styles.title}>Available Solutions</h2>
                <span className = {styles.blueLine}></span>
                <Slider {...settings}>
                    {solutionKeys.map((key, index) => {
                        return (
                            <section key = {key} className= {styles.solution}>
                                <Blurb heading= {solutionKeys[index]} blurb= {solutionsDesc[key]} />
                            </section>                            
                        )
                    })}
                </Slider>
                {mostRecentDocument && < section >
                    <h3 className = {styles.title} >Last Viewed</h3>
                    <span className = {styles.blueLine}></span>
                    < SearchResult 
                        title = {mostRecentDocument.name}
                        date = {mostRecentDocument.tags.createdOn}
                        solution = {mostRecentDocument.tags.solution}
                        proficiency = {mostRecentDocument.tags.proficiency}
                        content = {mostRecentDocument.tags.content}
                        desc = {mostRecentDocument.tags.description}
                        prereq= {mostRecentDocument.tags.prerequisites}
                        benefits = {mostRecentDocument.tags.benefits}
                        s3FileName = {mostRecentDocument.location}
                    />   
                </section>}
                {learningContent && < section >
                    {learningContent.length > 1 ? <><h3 className = {styles.title} >Based on your recent searches:</h3><span className = {styles.blueLine}></span></> : null}
                    < RelatedContent styles = {styles.homeContainer} />
                </section>}
            </>
        )
    }
}

// sets most recent document viewed and search query return to props from redux state
const mapStateToProps=(state)=>{
    const { mostRecentDocument } = state.lastViewed;
    const { learningContent } = state.searchResult;
    return {
        mostRecentDocument: mostRecentDocument,
        learningContent: learningContent
    }
}

export default connect(mapStateToProps)(HomePage);