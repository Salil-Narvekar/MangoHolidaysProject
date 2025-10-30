import { Buffer } from "buffer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import "./blogDetails.css";

if (typeof window !== "undefined" && !window.Buffer) {
    window.Buffer = Buffer;
}

const importAll = (r) => r.keys().map(r);
const markdownFiles = importAll(require.context("../../BlogsMdFiles", false, /\.md$/));

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        const loadBlog = async () => {
            for (const file of markdownFiles) {
                const response = await fetch(file);
                const text = await response.text();
                const { data, content } = matter(text);

                if (data.id.toString() === id.toString()) {
                    setBlog(data);
                    setContent(content);
                    document.title = data.title;
                    break;
                }
            }
        };
        loadBlog();
    }, [id]);

    if (!blog) return <p>Loading blog...</p>;

    return (
        <>
            {/* Banner Section */}
            <section className="banner-section-blog-details">
                <div className="img-container-blog-details">
                    <img src="/img/asfalt-dark.png" alt="Banner Unavailable" />
                </div>
                <div className="banner-overlay-blog-details">
                    <h1 className="banner-title-blog-details">{blog.title}</h1>
                    <p><i className="fa fa-user-alt" /> Mango Holidays | <i className="fa fa-calendar-alt" /> {blog.date}</p>
                </div>
            </section>


            {/* Blog details Content section */}
            <section className="content">
                <div className="blog-detail-image">
                    <img src={blog.background_image} alt={blog.title} />
                </div>
                <div className="blog-detail-content">
                    <ReactMarkdown
                        components={{
                            a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />
                        }}
                    >
                        {content.replace(/{id}/g, blog.id)}
                    </ReactMarkdown>
                </div>
            </section>


            {/* Bottom tagline */}
            <section className="bottom-tagline">
                <div className="bottom-tagline-background">
                    <img src="/img/asfalt-dark.png" alt="Banner Unavailable" />
                </div>
                <div className="bottom-tagline-overlay">
                    <h2>Share This Story, Choose Your Platform!</h2>
                </div>
            </section>
        </>
    );
};

export default BlogDetails;
