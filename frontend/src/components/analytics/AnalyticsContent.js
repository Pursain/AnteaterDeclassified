import React from 'react'
import AnalyticsTermOffered from './AnalyticsTermOffered'
import AnalyticsInstructors from './AnalyticsInstructors'

export const ANALYTICS_OPTIONS = Object.freeze({
    TERMS_OFFERED: "Terms offered",
    PROF_WHO_TEACH: "Professors who teach",
    REQUISTES: "Requistes"
})

export const AnalyticsContent = ({ course, selectedAnalytics }) => {
    switch (selectedAnalytics) {
        case ANALYTICS_OPTIONS.TERMS_OFFERED:
            return <AnalyticsTermOffered course={course} />
        case ANALYTICS_OPTIONS.PROF_WHO_TEACH:
            return <AnalyticsInstructors course={course} />
        case ANALYTICS_OPTIONS.REQUISTES:
            return "requistes"
        default:
            return "default"
    }
}