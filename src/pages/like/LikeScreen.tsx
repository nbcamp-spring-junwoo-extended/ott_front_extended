import { Card, Image, List, Typography } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FALLBACK_IMAGE } from '../../constants/global.ts';
import { getLikedVideos } from '../../core/apis/videoApi.ts';
import { Page } from '../../core/types/common.ts';
import { LikeReadResponseDto } from '../../core/types/video.ts';
import { notifyIfAxiosError } from '../../utils/axiosUtils.ts';

const useFetchLikedVideos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pagedVideos, setPagedVideos] = useState<Page<LikeReadResponseDto>>({} as Page<LikeReadResponseDto>);
  const [videos, setVideos] = useState<LikeReadResponseDto[]>([]);
  const [page, setPage] = useState(0);

  const abortController = useRef<AbortController | null>(null);

  const fetchLikedVideos = useCallback(async () => {
    abortController?.current?.abort();
    abortController.current = new AbortController();
    const { signal } = abortController.current;

    setIsLoading(true);
    try {
      const response = await getLikedVideos(page, signal);
      setPagedVideos(response.data.data);
      setVideos((prevVideos) => [...prevVideos, ...response.data.data.content]);
      setPage((prevPage) => prevPage + 1);
    } catch (e) {
      notifyIfAxiosError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchLikedVideos().then();
  }, []);

  return {
    isLast: pagedVideos.last,
    isLoading,
    pagedVideos,
    videos,
  };
};

export const LikeScreen: React.FC = () => {
  const {
    isLoading,
    pagedVideos: { last: isLast, totalElements },
    videos,
  } = useFetchLikedVideos();

  const navigate = useNavigate();

  const handleVideoClick = (videoId: number) => {
    navigate(`/videos/${videoId}`);
  };

  return (
    <Card title={<Typography.Title>💕 좋아요</Typography.Title>}>
      <Card.Meta
        description={
          <List
            dataSource={videos}
            footer={isLast && <Typography.Text>마지막 페이지입니다.</Typography.Text>}
            header={
              <Typography.Paragraph style={{ textAlign: 'end' }}>
                총 {totalElements}개의 영상이 있습니다.
              </Typography.Paragraph>
            }
            itemLayout="horizontal"
            loading={isLoading}
            renderItem={({ posterUrl, title, videoId }: LikeReadResponseDto) => (
              <List.Item onClick={() => handleVideoClick(videoId)}>
                <List.Item.Meta
                  avatar={
                    <Image
                      fallback={FALLBACK_IMAGE}
                      preview={false}
                      src={posterUrl.toString()}
                      style={{ height: '12rem' }}
                    />
                  }
                  description={
                    <Typography.Paragraph
                      style={{
                        fontSize: 'xx-large',
                        fontWeight: 'bold',
                        textAlign: 'start',
                      }}
                    >
                      {title}
                    </Typography.Paragraph>
                  }
                />
              </List.Item>
            )}
          />
        }
      />
    </Card>
  );
};
