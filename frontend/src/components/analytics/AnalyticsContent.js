import React from 'react'
import TermCard from './AnalyticsTermOffered'

export const ANALYTICS_OPTIONS = Object.freeze({
    TERMS_OFFERED: "Terms offered",
    PROF_WHO_TEACH: "Professors who teach",
    REQUISTES: "Requistes"
})

export const AnalyticsContent = ({ course, selectedAnalytics }) => {
    switch (selectedAnalytics) {
        case ANALYTICS_OPTIONS.TERMS_OFFERED:
            return <TermCard course={course} />
        case ANALYTICS_OPTIONS.PROF_WHO_TEACH:
            return "prof who teach"
        case ANALYTICS_OPTIONS.REQUISTES:
            return "requistes"
        default:
            return "default"
    }
}