import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PersonalInformation: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg w-full max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-40 h-40 rounded-full overflow-hidden bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 p-1 flex-shrink-0"
        >
          <img
            src="/images/profile.jpg"
            alt="정재헌"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-white mb-2">Jeong Jae Heon</h2>
          <p className="text-lg text-purple-200 mb-4">수적천석의 마음가짐으로 성실히 살아가는 중입니다!</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-purple-200">생년월일: 1999. 01. 19</p>
              <p className="text-purple-200">전화번호: +82 010 3135 7849</p>
              <p className="text-purple-200">이메일: jhe339@gmail.com</p>
              <p className="text-purple-200">
                GitHub: <Link href="https://github.com/sparkerhoney" className="underline">sparkerhoney</Link>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">EDUCATION</h3>
              <p className="text-purple-200">2022.02 명지대 산업경영공학과 편입학</p>
              <p className="text-purple-200">2018.02 동의방송예술대 연기전공 입학</p>
              <p className="text-purple-200">2017.02 서울 관악고등학교 졸업</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-white mb-2">GRADE</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <p className="text-purple-200">GPA: 3.89 / 4.5</p>
          <p className="text-purple-200">데이터 마이닝 A</p>
          <p className="text-purple-200">데이터 베이스 A+</p>
          <p className="text-purple-200">데이터 애널리틱스 A+</p>
          <p className="text-purple-200">마케팅 애널리틱스 A</p>
          <p className="text-purple-200">경영 정보 시스템 A</p>
          <p className="text-purple-200">산업 경영 통계 A</p>
          <p className="text-purple-200">스마트 서비스 공학 A+</p>
          <p className="text-purple-200">인간공학 및 작업관리 A</p>
          <p className="text-purple-200">캡스톤 디자인 A+</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-white mb-2">병역</h3>
        <p className="text-purple-200">기간: 20.04 - 21.10 육군 병장 만기 전역</p>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-white mb-2">ACTIVITIES</h3>
        <ul className="list-disc list-inside text-sm text-purple-200">
          <li>2023.03 ~ 2023.06: 강화학습과 NLP를 활용한 여행동선 스케줄러 (캡스톤 디자인 졸업작품, MJU)</li>
          <li>2023.03 ~ Present: DX-ASTI 수요기반 서비스 모델 추천시스템 개발 (KISTI, MJU CDS Lab)</li>
          <li>2023.03 ~ Present: 토픽 토모그래피를 위한 이종 도메인 통합 그래프 신경망 개발 (한국연구재단, MJU CDS Lab)</li>
          <li>2022.09 ~ 2022.12: 연료 성상 예측 및 연소최적화 (Bistelligence, MJU CDS Lab)</li>
          <li>2023.01 ~ Present: 데이터 분석 동아리 FOM 회장 (Industrial management eng, MJU)</li>
        </ul>
      </div>
    </motion.div>
  );
}

export default PersonalInformation;