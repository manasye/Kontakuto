import React from 'react';
import SkeletonBar from '../BarSkeleton';

export default function BarSkeletonGroup() {
    return (
        <>
            <SkeletonBar width="80%" height="16px" />
            <SkeletonBar width="80%" height="16px" />
            <SkeletonBar width="50%" height="16px" />
        </>
    );
}
