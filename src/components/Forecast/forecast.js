import './forecast.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Forecast({ data }) {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    return (
        <>



            <div className='forecast'>
                <label className="title">Daily previsions : </label>

                <Accordion allowZeroExpanded>
                    {data.list.splice(0, 7).map((item, idx) => (
                        <AccordionItem key={idx}>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    <div className="alert alert-secondary">

                                        <div className="day">
                                            <img src={`icons/${item.weather[0].icon}.png`} height="25px" width="30px" className="icon-small" alt="weather" />
                                            <label><strong>{forecastDays[idx]}</strong></label>
                                        </div>

                                        <div>
                                            <label className="description"><strong>{item.weather[0].description}</strong> &nbsp;</label>
                                            <label className="min-max"><i>{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</i></label>

                                        </div>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className="daily-details-grid">
                                    <div className='first-row'>
                                        <div className="daily-details-grid-item">
                                            <label className="left">Pressure :&nbsp;</label>
                                            <label className="right">{item.main.pressure}</label>
                                        </div>
                                        <div className="daily-details-grid-item">
                                            <label className="left">Humidity :&nbsp;</label>
                                            <label className="right">{item.main.humidity}</label>
                                        </div>
                                        <div className="daily-details-grid-item">
                                            <label className="flex-start">Clouds :&nbsp;</label>
                                            <label className="flex-end">{item.clouds.all}%</label>
                                        </div>
                                    </div>
                                    <div className='second-row'>
                                        <div className="daily-details-grid-item">
                                            <label className="left">Wind speed :&nbsp;</label>
                                            <label className="right">{item.wind.speed} m/s</label>
                                        </div>
                                        <div className="daily-details-grid-item">
                                            <label className="left">Sea level :&nbsp;</label>
                                            <label className="right">{item.main.sea_level}m</label>
                                        </div>
                                        <div className="daily-details-grid-item last-item">
                                            <label className="left">Feels like :&nbsp;</label>
                                            <label className="right">{item.main.feels_like}°C</label>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
                </Accordion>

            </div>
        </>

    )
}


export default Forecast;
