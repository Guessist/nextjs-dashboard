'use client';
/*
디바운싱은 함수가 실행될 수 있는 속도를 제한하는 프로그래밍 방식입니다. 
우리의 경우에는 사용자가 입력을 중단한 경우에만 데이터베이스를 쿼리하려고 합니다.
*/
import { useDebouncedCallback } from 'use-debounce'; // 디바운싱을 위한 컴포넌트
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
 
 // searchParams에 검색 매개변수 (params: key=value)를 담아줌
  const searchParams = useSearchParams();
  
  // pathname: 현재 위치한 경로를 출력해줌
  // 예시: pathname:  /dashboard/invoices
  const pathname = usePathname();

  // replace: 사용자의 입력이 포함된 URL을 업데이트 함  
  // useRouter를 사용하여 라우터 객체에서 replace 함수를 추출합니다. 
  // 이 함수는 현재 페이지의 URL을 변경할 때 사용됩니다.
  const { replace } = useRouter();   

  // function handleSearch(term: string) { // input -> 사용자의 입력을 추적할 수 있음
    
  //   console.log(`Searching... ${term}`);
  //   console.log('Searching...', term);
  //   // URLSearchParams는 url 쿼리 파라미터를 만지작(set, delete 등)하기 위해 쓰는 웹 API임. 
  //   const params = new URLSearchParams(searchParams);
  //   // params: ?page=1&query=a 이런 형식의 URL임
  //   if (term) {
  //     params.set('query', term);  // key=value를 설정하는 코드 : params=> query=term 가 됨
  //   } else { // placeholder에 아무것도 없다면 param에 'query'를 삭제함 => url 초기화
  //     params.delete('query');
  //   }
  //   // 예시: Lee를 입력했다면, replace(`${pathname}?${params.toString()}`);  
  //   // ==> /dashboard/invoices?query=lee
  //   replace(`${pathname}?${params.toString()}`);  // 현재 페이지의 URL 변경하는 함수
  //   // console.log('term: ', term);
  // }

// 디바운싱 함수
// useDebouncedCallback는 handleSearch 함수내용을 묶고, 사용자가 타이핑 멈춘뒤 300ms뒤에 실행하게함
const handleSearch = useDebouncedCallback((term) => {
  console.log(`Searching... ${term}`);
 
  const params = new URLSearchParams(searchParams);
  params.set('page', '1');
  if (term) {
    params.set('query', term);
  } else {
    params.delete('query');
  }
  replace(`${pathname}?${params.toString()}`);
}, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      {/* input -> 사용자의 입력을 추적할 수 있음. 확인방법: 개발자도구->console */}
      {/* onChange :해당 요소의 값이 변경될 때 실행되는 이벤트   
          e.target.value: 사용자가 입력한 텍스트
       */}
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        
        defaultValue={searchParams.get('query')?.toString()}
      />
      {/* searchParams.get('*')?.toString()  *라는 key를 써칭하고
             *가 존재하면 *의 value값을 리턴하고  value 값에 대해 .toString() 실행
             *가 존재하지 않으면 디폴트 값을 리턴해줌. */}
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}