const campValidator = (campaign) => {
    return campaign.user_id && campaign.name && campaign.description ? true : false
}

module.exports = campValidator