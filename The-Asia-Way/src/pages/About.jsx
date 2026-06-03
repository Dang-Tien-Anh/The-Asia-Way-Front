import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout, Flame, Heart } from "lucide-react";

export default function About() {
    return (
        <>
            <PageHero
                title="Our Story"
                subtitle="Hand-pulled noodles, slow broths, real flavors from the east."
                image="/images/about-hero.jpg"
            />

            <section className="bg-dark text-white py-5">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="fw-bold display-5 mb-4"
                    >
                        A bowl is a love letter.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted"
                    >
                        The Noodle Way started with a single recipe — a broth our grandmother simmered for twelve hours, every Sunday, for a family that always showed up hungry. Today, every bowl we serve carries that same patience.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-muted"
                    >
                        We pull our noodles by hand. We hand-fold every dumpling. We source chilies, soy, and herbs from growers who care as much as we do. Nothing is shortcut, nothing is pre-packaged.
                    </motion.p>
                </div>
            </section>

            <section className="bg-light py-5">
                <div className="container text-center">
                    <h2 className="fw-bold display-6 mb-5">What we believe</h2>
                    <div className="row">
                        {[
                            { icon: Sprout, title: "Fresh", desc: "Daily-sourced produce, dough made every morning." },
                            { icon: Flame, title: "Authentic", desc: "Recipes passed down, not reinvented." },
                            { icon: Heart, title: "With Care", desc: "Every dish prepared by hand, by people who love this food." },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="col-md-4 mb-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-white rounded shadow p-4 h-100"
                                >
                                    <div className="mb-3">
                                        <Icon className="text-danger" size={32} />
                                    </div>
                                    <h3 className="fw-bold">{title}</h3>
                                    <p className="text-dark">{desc}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-dark text-white py-5 text-center">
                <div className="container">
                    <h2 className="fw-bold display-6">Come hungry.</h2>
                    <p className="mt-3 text-muted">
                        Reserve a table or order online — your bowl is waiting.
                    </p>
                    <div className="mt-4 d-flex justify-content-center gap-3">
                        <Link to="/menu" className="btn btn-danger btn-lg">
                            View Menu
                        </Link>
                        <Link to="/contact" className="btn btn-outline-light btn-lg">
                            Reserve a Table
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

function PageHero({ title, subtitle, image }) {
    return (
        <section className="position-relative" style={{ height: "60vh", minHeight: "420px", overflow: "hidden" }}>
            <motion.img
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4 }}
                src={image}
                alt=""
                className="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
            <div className="position-relative z-1 d-flex flex-column align-items-center justify-content-center h-100 text-white text-center px-3">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fw-bold display-4"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-3 fs-5"
                >
                    {subtitle}
                </motion.p>
            </div>
        </section>
    );
}

// note: might remove about, depends
