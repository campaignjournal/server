const campValidator = (campaign) => {
    return campaign.user_id && campaign.name && campaign.desc ? true : false
}

module.exports = campValidator