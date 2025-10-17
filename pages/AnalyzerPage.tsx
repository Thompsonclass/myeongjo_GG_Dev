import React, { useState, useCallback, useMemo } from 'react';
// Fix: Import `useDropzone` from `react-dropzone` to resolve "Cannot find name 'useDropzone'" error.
import { useDropzone } from 'react-dropzone';
import { parseScreenshotWithGemini } from '../services/ocrService';
import { buildGuides } from '../data/buildGuides';
import { resonators } from '../data/resonators';
import { BuildGuide, Resonator, Rarity } from '../types';

interface AnalysisResult {
    resonatorName: string;
    level: number;
    hp: number;
    atk: number;
    def: number;
    critRate: number;
    critDmg: number;
    energyRecharge: number;
    elementalDmgType: string;
    elementalDmgBonus: number;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

const ImageUploader: React.FC<{ onUpload: (file: File) => void; isUploading: boolean }> = ({ onUpload, isUploading }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onUpload(acceptedFiles[0]);
        }
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: false });

    return (
        <div
            {...getRootProps()}
            className={`w-full p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                ${isDragActive ? 'border-gold bg-gray-700' : 'border-gray-600 hover:border-gold hover:bg-gray-800'}
                ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <input {...getInputProps()} disabled={isUploading} />
            <div className="flex flex-col items-center justify-center text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-500 mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                {isUploading ? (
                    <p className="text-lg text-gold">이미지 분석 중...</p>
                ) : isDragActive ? (
                    <p className="text-lg text-gold">여기에 파일을 놓으세요</p>
                ) : (
                    <>
                        <p className="text-lg text-gray-300">캐릭터 스탯 스크린샷을 드래그 앤 드롭</p>
                        <p className="text-gray-500">또는 클릭하여 파일 선택</p>
                    </>
                )}
            </div>
        </div>
    );
};

const StatComparison: React.FC<{ label: string; userValue: number; targetValue: number; isPercent?: boolean }> = ({ label, userValue, targetValue, isPercent = false }) => {
    const difference = userValue - targetValue;
    const performanceRatio = targetValue > 0 ? userValue / targetValue : 1;

    let colorClass = 'text-gray-300';
    if (performanceRatio >= 0.95) {
        colorClass = 'text-green-400';
    } else if (performanceRatio >= 0.80) {
        colorClass = 'text-yellow-400';
    } else {
        colorClass = 'text-red-400';
    }

    const formatValue = (val: number) => isPercent ? `${val.toFixed(1)}%` : val.toLocaleString();

    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-700">
            <span className="font-semibold text-white">{label}</span>
            <div className="flex items-center gap-2 text-sm">
                <span className={colorClass}>{formatValue(userValue)}</span>
                <span className="text-gray-500">/</span>
                <span className="text-gray-400">{formatValue(targetValue)}</span>
            </div>
        </div>
    );
};

const ResultDisplay: React.FC<{ result: AnalysisResult; guide: (BuildGuide & { resonator: Resonator }) | null }> = ({ result, guide }) => {
    
    const parseTargetValue = (valueStr: string): number => {
        const cleaned = valueStr.replace(/%|~|\[.*\]/g, '').trim();
        return parseFloat(cleaned) || 0;
    };

    if (!guide) {
        return (
            <div className="text-center bg-gray-800 p-8 rounded-lg">
                <h2 className="text-xl font-bold text-white">분석 완료: {result.resonatorName} (Lv.{result.level})</h2>
                <p className="text-yellow-400 mt-4">이 캐릭터에 대한 추천 빌드 가이드를 찾을 수 없습니다.</p>
            </div>
        );
    }

    const targetStatsMap: Record<string, number> = {
        '크확': parseTargetValue(guide.targetStats['크확']),
        '크피': parseTargetValue(guide.targetStats['크피']),
        '공명 효율': parseTargetValue(guide.targetStats['공명 효율']),
        '공격력': parseTargetValue(guide.targetStats['공격력']),
        '체력': parseTargetValue(guide.targetStats['체력']),
    };

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden animate-fade-in">
            <div className="p-6 bg-gray-900/50">
                <div className="flex items-center gap-4">
                    <img src={guide.resonator.imageUrl} alt={guide.resonator.name} className="w-20 h-20 rounded-full bg-gray-700 border-2 border-gold" />
                    <div>
                        <h2 className="text-3xl font-bold text-white">{guide.resonator.name} <span className="text-xl text-gray-400">Lv.{result.level}</span></h2>
                        <p className="text-md text-gold">{guide.position}</p>
                    </div>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white border-b-2 border-gold/50 pb-2">스탯 비교 분석</h3>
                    <StatComparison label="공격력" userValue={result.atk} targetValue={targetStatsMap['공격력']} />
                    <StatComparison label="치명타 확률" userValue={result.critRate} targetValue={targetStatsMap['크확']} isPercent />
                    <StatComparison label="치명타 피해" userValue={result.critDmg} targetValue={targetStatsMap['크피']} isPercent />
                    <StatComparison label="공명 효율" userValue={result.energyRecharge} targetValue={targetStatsMap['공명 효율']} isPercent />
                    {targetStatsMap['체력'] > 0 && <StatComparison label="HP" userValue={result.hp} targetValue={targetStatsMap['체력']} />}
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white border-b-2 border-gold/50 pb-2">추천 빌드</h3>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gold mb-2">추천 무기</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-200">
                             {guide.recommendedWeapons.map((weapon, index) => (
                                <li key={index}>{weapon.name} {weapon.tag && <span className="text-xs bg-gold/20 text-gold rounded-sm px-1.5 py-0.5 ml-1">{weapon.tag}</span>}</li>
                            ))}
                        </ul>
                    </div>
                     <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gold mb-2">에코 세팅: <span className="text-white">{guide.echoSetup.set}</span></h4>
                        <div className="text-sm">
                            <p className="text-gray-300"><strong className="text-gray-100">주옵션:</strong> {guide.echoSetup.mainStats.join(', ')}</p>
                            <p className="text-gray-300"><strong className="text-gray-100">부옵션:</strong> {guide.echoSetup.subStats.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AnalyzerPage: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

    const guidesWithResonators = useMemo(() => {
        return buildGuides.map(guide => {
            const resonator = resonators.find(r => r.id === guide.resonatorId);
            return resonator ? { ...guide, resonator } : null;
        }).filter((g): g is BuildGuide & { resonator: Resonator } => g !== null);
    }, []);

    const handleUpload = (file: File) => {
        setImageFile(file);
        setImageUrl(URL.createObjectURL(file));
        setAnalysisResult(null);
        setError('');
    };

    const handleAnalyze = async () => {
        if (!imageFile) return;
        setIsLoading(true);
        setError('');
        setAnalysisResult(null);

        try {
            const base64Image = await fileToBase64(imageFile);
            const result = await parseScreenshotWithGemini(base64Image);
            setAnalysisResult(result);
        } catch (e: any) {
            setError(e.message || '분석 중 오류가 발생했습니다. 이미지가 선명한지 확인해주세요.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const matchedGuide = useMemo(() => {
        if (!analysisResult) return null;
        return guidesWithResonators.find(g => g.resonator.name === analysisResult.resonatorName) || null;
    }, [analysisResult, guidesWithResonators]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-white">빌드 분석기 (Gemini AI)</h1>
            <p className="text-gray-400 mb-6">캐릭터 스탯 스크린샷을 업로드하여 추천 빌드와 비교 분석해보세요.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                    <ImageUploader onUpload={handleUpload} isUploading={isLoading} />
                    {imageUrl && !isLoading && (
                        <div className="space-y-4">
                            <img src={imageUrl} alt="Screenshot preview" className="rounded-lg max-h-60 mx-auto" />
                            <button
                                onClick={handleAnalyze}
                                disabled={isLoading}
                                className="w-full bg-gold hover:bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-wait"
                            >
                                분석 시작
                            </button>
                        </div>
                    )}
                </div>
                
                <div className="w-full">
                    {isLoading && (
                         <div className="flex flex-col justify-center items-center h-full bg-gray-800 p-8 rounded-lg min-h-[300px]">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
                            <p className="text-gold mt-4">Gemini AI가 스크린샷을 분석 중입니다...</p>
                        </div>
                    )}
                    {error && (
                         <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg">
                            <h3 className="font-bold">분석 실패</h3>
                            <p>{error}</p>
                        </div>
                    )}
                    {analysisResult && (
                        <ResultDisplay result={analysisResult} guide={matchedGuide} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalyzerPage;