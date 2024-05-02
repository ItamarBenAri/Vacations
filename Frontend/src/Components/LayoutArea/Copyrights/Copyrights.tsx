import "./Copyrights.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, GitHub, LinkedIn, X } from "@mui/icons-material";
import { Box } from "@mui/material";
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";

function Copyrights(): JSX.Element {
    return (
        <div className="Copyrights">
            <Box
                component="footer"
                sx={AppComponentsStyle.copyrightsMainBox}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                About Us
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                We believe everyone should be free to experience the world. For us, there’s no greater freedom than choosing where you want to be and how you want to get there.<br /><br />
                                That’s why we’re breaking down the barriers to low-cost travel, making the world open and accessible for all.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                Contact Us
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                305 Hertzel Street, Tel Aviv, Israel
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Email: etamar234@gmail.com
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Phone: +972 54 8806891
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                Follow Us
                            </Typography>
                            <Link href="https://www.facebook.com/etamar.damari"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                            >
                                <Facebook />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/itamar-ben-ari-69678b28b/"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                                sx={AppComponentsStyle.copyrightsLink}
                            >
                                <LinkedIn />
                            </Link>
                            <Link href="https://twitter.com/Itamar_Ben_Ari"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                            >
                                <X />
                            </Link>
                            <Link href="https://github.com/ItamarBenAri"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                                sx={AppComponentsStyle.copyrightsLink}
                            >
                                <GitHub />
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Typography variant="body2" color="text.secondary" align="center">
                            {"© "} {new Date().getFullYear()} {" Itamar Ben Ari, Israel. All Rights Reserved."}
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </div>
    );
}

export default Copyrights;