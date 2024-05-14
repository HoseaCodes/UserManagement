import React from 'react';
import SkeletonElement from './skeletonElement';
import Shimmer from './skimmer';

const SkeletonProfile = () => {
    return (
        <div className="skeleton-wrapper profile">
            <div className="skeleton-card row">
                <div className="skeleton-profile col-lg-5 col-md-6">
                    <SkeletonElement type="avatar"/>
                    <SkeletonElement type="title" />
                </div>
                <div className="pt-5 col-lg-7 col-md-6 pl-xl-3">
                    <SkeletonElement type="title" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                </div>
            </div>
            <Shimmer/>
        </div>
    )
}

export default SkeletonProfile;