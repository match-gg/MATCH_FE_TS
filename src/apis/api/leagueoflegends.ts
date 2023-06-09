import { useEffect, useState } from 'react';
import { authAxios, defaultAxios } from 'apis/utils';

import { promiseWrapper } from 'apis/utils/promiseWrapper';
import { cardActions } from 'store/card-slice';

// 카드 리스트 가져오기 (게시글 목록 가져오기)
export function fetchCardList(url: string, config: any, deps: any[]) {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const promise = defaultAxios
        .get(url, config)
        .then((response) => response.data);
      setResource(promiseWrapper(promise));
    };

    getData();
  }, deps);

  return resource;
}

// 카드 디테일 가져오기 (카드 상세보기 가져오기)
export function fetchCardDetail(url: string) {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const promise = defaultAxios.get(url).then((response) => response.data);
      setResource(promiseWrapper(promise));
    };

    getData();
  }, []);

  return resource;
}

export const getExactSummonerName = async (summonerName: string) => {
  const response = await defaultAxios.get(
    `/api/lol/user/exist/${summonerName}`,
  );

  if (response.status === 200) {
    return response.data;
  }

  return null;
};

export const loadSummonerInfoInDB = async (summonerName: string) => {
  const response = await defaultAxios.get(`/api/lol/user/${summonerName}`);

  if (response.status === 200) {
    return 'success';
  }

  return null;
};

/** ------------------------------------------------------------
 * 롤 게시글 수정
 * @param {number} boardId - 게시글 번호
 * @param {any} userInput - 사용자가 입력한 게시글 정보
 */
