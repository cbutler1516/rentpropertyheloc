"use client";

import { FinancingReviewModal } from "@/components/funnel/financing-review-modal";
import { FinancingReviewViewer } from "@/components/funnel/financing-review-viewer";
import type { FinancingReviewData } from "@/lib/leads/financing-review-document";
import { printFinancingReviewPdf } from "@/lib/leads/financing-review-document";
import { useCallback, useEffect, useRef, useState } from "react";

type FinancingReviewExperienceProps = {
  reviewData: FinancingReviewData;
  autoOpenModal?: boolean;
};

export function FinancingReviewExperience({
  reviewData,
  autoOpenModal = false,
}: FinancingReviewExperienceProps) {
  const { experience } = useFinancingReviewActions(reviewData, autoOpenModal);
  return experience;
}

export function useFinancingReviewActions(
  reviewData: FinancingReviewData,
  autoOpenModal = false,
) {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const autoOpenedRef = useRef(false);

  const downloadPdf = useCallback(() => printFinancingReviewPdf(reviewData), [reviewData]);
  const openModal = useCallback(() => setModalOpen(true), []);
  const openViewer = useCallback(() => setViewerOpen(true), []);

  useEffect(() => {
    if (!autoOpenModal || autoOpenedRef.current) return;
    autoOpenedRef.current = true;
    setModalOpen(true);
  }, [autoOpenModal]);

  const experience = (
    <>
      <FinancingReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onViewReview={() => {
          setModalOpen(false);
          setViewerOpen(true);
        }}
        onDownloadPdf={downloadPdf}
      />
      <FinancingReviewViewer
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        data={reviewData}
        onDownloadPdf={downloadPdf}
      />
    </>
  );

  return { experience, openModal, openViewer, downloadPdf };
}
