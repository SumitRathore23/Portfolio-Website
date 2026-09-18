import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const handleChange = (e) => {
    setFormData((previous) => ({
        ...previous,
        [e.target.name]: e.target.value,
    }));
};

    const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
        setStatus("error");
        return;
    }

    setLoading(true);
    setStatus("");

    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/contact`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Failed to send message"
            );
        }

        setStatus("success");

        setFormData({
            name: "",
            email: "",
            message: "",
        });

    } catch (error) {
        console.error("Contact form error:", error);
        setStatus("error");

    } finally {
        setLoading(false);
    }
};

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">

                {/* LEFT — CONTACT FORM */}
                <ScrollReveal direction="left">
                    <div className="contact-content">

                        <p className="section-label">
                            07 — CONTACT
                        </p>

                        <h2>
                            Let's build
                            <br />
                            something <span>great.</span>
                        </h2>

                        <p className="contact-description">
                            Have a project, opportunity or idea?
                            Send me a message and I'll get back to you.
                        </p>

                        <form
                            className="contact-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="contact-input-row">

                                <div className="input-group">
                                    <label htmlFor="name">
                                        YOUR NAME
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="email">
                                        YOUR EMAIL
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                            </div>

                            <div className="input-group">
                                <label htmlFor="message">
                                    MESSAGE
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell me about your project..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    maxLength={1000}
                                    required
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="contact-submit"
                                disabled={loading}
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <span>
                                    {loading
                                        ? "SENDING..."
                                        : "SEND MESSAGE"}
                                </span>

                                <span className="submit-arrow">
                                    ↗
                                </span>
                            </motion.button>

                            {status === "success" && (
                                <motion.div
                                    className="contact-status success"
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                >
                                    <span>✓</span>
                                    Message received. I'll get back to you soon.
                                </motion.div>
                            )}

                            {status === "error" && (
                                <motion.div
                                    className="contact-status error"
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                >
                                    <span>!</span>
                                    Something went wrong. Please try again.
                                </motion.div>
                            )}

                        </form>
                    </div>
                </ScrollReveal>


                {/* RIGHT — ANIMATED VISUAL */}
                <ScrollReveal direction="right" delay={0.15}>
                    <div className="contact-visual">

                        <div className="contact-visual-grid"></div>

                        <div className="contact-window">

                            <div className="contact-window-header">

                                <div className="window-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                                <span className="window-title">
                                    SUMIT / PORTFOLIO
                                </span>

                            </div>

                            <div className="contact-workspace">

                                <div className="workspace-glow"></div>

                                {/* MONITOR */}
                                <motion.div
                                    className="workspace-monitor"
                                    animate={{
                                        y: [0, -5, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <div className="monitor-screen">

                                        <div className="screen-code">
                                            <span>const</span>{" "}
                                            developer =
                                        </div>

                                        <div className="screen-name">
                                            SUMIT<span>.</span>
                                        </div>

                                        <div className="screen-role">
                                            FULL STACK DEVELOPER
                                        </div>

                                    </div>

                                    <div className="monitor-stand"></div>
                                </motion.div>

                                {/* LAMP */}
                                <motion.div
                                    className="workspace-lamp"
                                    animate={{
                                        rotate: [-3, 3, -3],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <div className="lamp-shade"></div>
                                    <div className="lamp-arm"></div>
                                </motion.div>

                                {/* DESK */}
                                <div className="workspace-desk">
                                    <div className="desk-edge"></div>
                                </div>

                                {/* FLOATING CARD */}
                                <motion.div
                                    className="workspace-message"
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <small>AVAILABLE FOR</small>

                                    <strong>
                                        NEW PROJECTS
                                    </strong>

                                    <span>↗</span>
                                </motion.div>

                            </div>
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
}

export default Contact;